import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";
import { languageMapper } from "@/entities/tour/landing";
import type { ENUM_LANGUAGES_TYPE } from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	GUIDE_ANY_LANGUAGE,
	type IGuidePriceRow,
	type IGuidePriceRowMarkup,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TGuideByLanguageCategoryBackend,
	type TGuideByLanguageCategoryInputBackend,
	type TGuideCategoryChargeInputBackend,
	type TGuideDetailsBackend,
	type TGuidePricingSchema,
	type TPerGroupTierInputBackend
} from "../../../types";
import { getPoolMember } from "../common/event-pool.helpers";
import {
	mapExtraCostsFromBackend,
	mapExtraCostsToBackend
} from "../common/extra-costs.converters";
import {
	mapFeesFromBackend,
	mapFeesToBackend
} from "../common/fees.converters";

import {
	getGuideColumnPax,
	getGuideTierCostAt,
	mapGuidePriceBoundsFromBackend,
	mapGuidePriceTiersToBackend
} from "./guide-group-tiers.converters";

type TMoneyInput = TPerGroupTierInputBackend["cost"];
type TCharge = NonNullable<TGuideByLanguageCategoryBackend["expenses"]>;

export const createEmptyGuidePriceRow = (columns: number): IGuidePriceRow => ({
	[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: "",
	[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: Array.from(
		{ length: columns },
		() => null
	)
});

export const getDefaultGuidePricing = (): TGuidePricingSchema => ({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
		ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]: ENUM_GUIDE_CHARGE.PER_DURATION,
	[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: [],
	[ENUM_GUIDE_PRICING_FIELD.ROWS]: [],
	[ENUM_GUIDE_PRICING_FIELD.FEES]: [],
	[ENUM_GUIDE_PRICING_FIELD.MARKUP]: null,
	[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]: [],
	[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]: false,
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
});

const PERCENT_PRECISION = 10_000;

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): IGuidePriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		// 0.07 * 100 is 7.000000000000001 in floating point.
		const percent =
			Math.round((markup.percentage ?? 0) * 100 * PERCENT_PRECISION) /
			PERCENT_PRECISION;
		return {
			typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
			value: String(percent)
		};
	}
	return {
		typ: ENUM_GUIDE_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const getChargeCurrency = (charge: TCharge) => {
	if (charge.typ === "fixed") return charge.cost?.currency;
	const rate = charge.rate;
	if (rate.typ === "per_group") return rate.tiers[0]?.cost?.currency;
	if (rate.typ === "per_person") return rate.cost_per_person?.currency;
	return rate.cost?.currency;
};

const getChargeBounds = (charge: TCharge): number[] =>
	charge.typ === "per_duration" && charge.rate.typ === "per_group"
		? mapGuidePriceBoundsFromBackend(charge.rate.tiers)
		: [];

/** What the charge costs a group of `pax` per its own unit (day or trip). */
const getChargeCostAt = (charge: TCharge, pax: number): number | null => {
	if (charge.typ === "fixed") return charge.cost?.val ?? null;
	const rate = charge.rate;
	if (rate.typ === "per_group") return getGuideTierCostAt(rate.tiers, pax);
	if (rate.typ === "per_person") return rate.cost_per_person?.val ?? null;
	return rate.cost?.val ?? null;
};

/** Everything a category carries beside its own price, for the shape check. */
const getChargeShape = (charge: TCharge) =>
	JSON.stringify([
		charge.typ,
		getChargeCurrency(charge),
		getChargeBounds(charge),
		mapFeesFromBackend(charge.fees),
		mapMarkupFromBackend(charge.markup),
		mapExtraCostsFromBackend(charge.extra_costs)
	]);

const mapLangFromBackend = (
	lang: TGuideByLanguageCategoryBackend["lang"]
): string =>
	lang == null ? GUIDE_ANY_LANGUAGE : (languageMapper.from(lang) ?? "");

const isPerPersonRate = (charge: TCharge) =>
	charge.typ === "per_duration" && charge.rate.typ === "per_person";

export const mapGuidePricingFromBackend = (
	details?: TGuideDetailsBackend | null,
	supplyId?: string | null
): TGuidePricingSchema => {
	// Contract 6: language categories live on the pool member `spec`.
	const categories = getPoolMember(details, supplyId)?.spec?.categories ?? [];
	const defaults = getDefaultGuidePricing();
	const template = categories.find((category) => category.expenses)?.expenses;

	if (!template) {
		return {
			...defaults,
			[ENUM_GUIDE_PRICING_FIELD.ROWS]: categories.map((category) => ({
				...createEmptyGuidePriceRow(1),
				[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: mapLangFromBackend(
					category.lang
				)
			}))
		};
	}

	// One matrix for every language: the first priced category sets the
	// shared mode, currency, bounds, fees, markup and extra costs.
	const bounds = getChargeBounds(template);
	const columns = template.typ === "per_duration" ? bounds.length + 1 : 1;
	const templateShape = getChargeShape(template);
	const markup = mapMarkupFromBackend(template.markup);

	const rows = categories.map(
		(category): IGuidePriceRow => ({
			[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: mapLangFromBackend(
				category.lang
			),
			[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: Array.from(
				{ length: columns },
				(_, column) =>
					category.expenses
						? getChargeCostAt(
								category.expenses,
								getGuideColumnPax(bounds, column)
							)
						: null
			)
		})
	);

	const isLegacyShape = categories.some(
		({ expenses }) =>
			!!expenses &&
			(isPerPersonRate(expenses) ||
				getChargeShape(expenses) !== templateShape)
	);

	return {
		...defaults,
		[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: !!markup?.value,
		[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]:
			template.typ === "fixed"
				? ENUM_GUIDE_CHARGE.FIXED
				: ENUM_GUIDE_CHARGE.PER_DURATION,
		[ENUM_GUIDE_PRICING_FIELD.CURRENCY]:
			currencyConverter.from(getChargeCurrency(template)) ??
			defaults[ENUM_GUIDE_PRICING_FIELD.CURRENCY],
		[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds.map((upToPax) => ({
			[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX]: upToPax
		})),
		[ENUM_GUIDE_PRICING_FIELD.ROWS]: rows,
		[ENUM_GUIDE_PRICING_FIELD.FEES]: mapFeesFromBackend(template.fees),
		[ENUM_GUIDE_PRICING_FIELD.MARKUP]: markup,
		[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]: mapExtraCostsFromBackend(
			template.extra_costs
		),
		[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]: isLegacyShape
	};
};

const mapMarkupToBackend = (
	markup: IGuidePriceRowMarkup | null,
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined,
	addMarginSeparately: boolean
): TCommissionMarkupInputBackend | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_GUIDE_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	if (!currency) return null;
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: currencyConverter.to(currency)!
		}
	};
};

/** Every row becomes one category; all of them share the matrix settings. */
export const mapGuideCategoriesToBackend = (
	pricing: TGuidePricingSchema
): TGuideByLanguageCategoryInputBackend[] => {
	const currency = pricing[ENUM_GUIDE_PRICING_FIELD.CURRENCY];
	const bounds = pricing[ENUM_GUIDE_PRICING_FIELD.BOUNDS];
	const isPerDuration =
		pricing[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP] ===
		ENUM_GUIDE_CHARGE.PER_DURATION;
	const columns = isPerDuration ? bounds.length + 1 : 1;

	// Currency always goes out: the backend would default it to USD.
	const toMoney = (val: number): TMoneyInput => ({
		val,
		...(currency && { currency: currencyConverter.to(currency)! })
	});
	const markup = mapMarkupToBackend(
		pricing[ENUM_GUIDE_PRICING_FIELD.MARKUP],
		currency,
		pricing[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
	);
	const shared = {
		fees: mapFeesToBackend(pricing[ENUM_GUIDE_PRICING_FIELD.FEES]),
		extra_costs: mapExtraCostsToBackend(
			pricing[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]
		),
		...(markup && { markup })
	};

	const mapRow = (
		row: IGuidePriceRow
	): TGuideByLanguageCategoryInputBackend[] => {
		const rowLang = row[ENUM_GUIDE_PRICE_ROW_FIELD.LANG];
		const lang =
			rowLang === GUIDE_ANY_LANGUAGE
				? null
				: (languageMapper.to(rowLang as ENUM_LANGUAGES_TYPE) ?? null);
		const costs = Array.from(
			{ length: columns },
			(_, column) => row[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS][column] ?? null
		);
		const hasPrice = costs.some((cost) => cost !== null);

		// A language without a price stays listed (fe6.6 §2); a priceless
		// fallback says nothing.
		if (!hasPrice) {
			return lang ? [{ lang, expenses: null }] : [];
		}

		const expenses: TGuideCategoryChargeInputBackend = isPerDuration
			? {
					typ: "per_duration",
					rate: {
						typ: "per_group",
						tiers: mapGuidePriceTiersToBackend(
							bounds,
							costs,
							toMoney
						)
					},
					...shared
				}
			: { typ: "fixed", cost: toMoney(costs[0] ?? 0), ...shared };

		return [{ lang, expenses }];
	};

	return pricing[ENUM_GUIDE_PRICING_FIELD.ROWS].flatMap(mapRow);
};
