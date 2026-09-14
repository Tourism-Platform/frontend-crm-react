import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";
import { languageMapper } from "@/entities/tour/landing/converters/languages.converters";
import { ENUM_LANGUAGES } from "@/entities/tour/landing/types/languages.types";

import { DEFAULT_GUIDE_UP_TO_PAX } from "../../config";
import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE,
	type IFeeFormRow,
	type IGuideCategoryPriceRow,
	type IGuidePerGuideByLanguagePriceRow,
	type IGuidePerGuideCategoryExpenses,
	type IGuidePerGuideExpenses,
	type IGuidePerGuidePriceRow,
	type IGuidePriceRowMarkup,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TDurationChargeBackend,
	type TFixedChargeBackend,
	type TGuideByLanguageCategoryBackend,
	type TGuideByLanguageCategoryInputBackend,
	type TGuideCategoryChargeInputBackend,
	type TGuideDetailsBackend,
	type TGuidePricingSchema,
	type TGuidesSchema
} from "../../types";

import { mapFeesFromBackend, mapFeesToBackend } from "./fees.converters";
import {
	mapGuideGroupTiersFromBackend,
	mapGuideGroupTiersToBackend
} from "./guide-group-tiers.converters";

type TGuidesList = TGuidesSchema[typeof ENUM_FORM_GUIDES.GUIDES_LIST];

type TGuideChargeBackend = TFixedChargeBackend | TDurationChargeBackend;

const createEmptyPerGuidePriceRow = (): IGuidePerGuidePriceRow => ({
	[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]: ENUM_GUIDE_CHARGE.PER_DURATION,
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: undefined,
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): IGuideCategoryPriceRow => ({
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: "",
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CHARGE_TYP]: ENUM_GUIDE_CHARGE.PER_DURATION,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: [],
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: undefined,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerGuideByLanguagePriceRow =
	(): IGuidePerGuideByLanguagePriceRow => ({
		[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): IGuidePriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_GUIDE_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapChargeToPriceFields = (
	expenses?: TGuideChargeBackend | null
): Pick<
	IGuidePerGuidePriceRow,
	| typeof ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP
	| typeof ENUM_GUIDE_PRICE_ROW_FIELD.COST
	| typeof ENUM_GUIDE_PRICE_ROW_FIELD.FEES
	| typeof ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY
	| typeof ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP
> => {
	if (!expenses) {
		return {
			[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]:
				ENUM_GUIDE_CHARGE.PER_DURATION,
			[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
			[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: [],
			[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: undefined,
			[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
		};
	}

	const fees = mapFeesFromBackend(expenses.fees);
	const markup = mapMarkupFromBackend(expenses.markup);

	if (expenses.typ === "per_duration" || "rate" in expenses) {
		const duration = expenses as TDurationChargeBackend;
		const rate = duration.rate;
		if (rate && "tiers" in rate) {
			const tierFields = mapGuideGroupTiersFromBackend(rate.tiers);
			return {
				[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]:
					ENUM_GUIDE_CHARGE.PER_DURATION,
				[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: tierFields.cost,
				[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: fees,
				[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: tierFields.currency,
				[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markup
			};
		}
		if (rate && "cost" in rate) {
			return {
				[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]:
					ENUM_GUIDE_CHARGE.PER_DURATION,
				[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: rate.cost?.val ?? null,
				[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: fees,
				[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: currencyConverter.from(
					rate.cost?.currency
				),
				[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markup
			};
		}
		return {
			[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]:
				ENUM_GUIDE_CHARGE.PER_DURATION,
			[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
			[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: fees,
			[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: undefined,
			[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markup
		};
	}

	const fixed = expenses as TFixedChargeBackend;
	return {
		[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]: ENUM_GUIDE_CHARGE.FIXED,
		[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: fixed.cost?.val ?? null,
		[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: fees,
		[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: currencyConverter.from(
			fixed.cost?.currency
		),
		[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markup
	};
};

const mapCategoryRowFromBackend = (
	category: TGuideByLanguageCategoryBackend
): IGuideCategoryPriceRow => {
	const priceFields = mapChargeToPriceFields(category.expenses);

	return {
		[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]:
			languageMapper.from(category.lang) ?? "",
		...priceFields
	};
};

const alignPerGuidePriceRows = (
	guidesListLength: number,
	existing: IGuidePerGuidePriceRow[] = [],
	apiRows?: TGuideByLanguageCategoryBackend[] | null
): IGuidePerGuidePriceRow[] =>
	Array.from({ length: guidesListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		const apiRow = apiRows?.[index];
		if (apiRow) {
			return mapChargeToPriceFields(apiRow.expenses);
		}
		return createEmptyPerGuidePriceRow();
	});

const alignPerGuideByLanguagePriceRows = (
	guidesListLength: number,
	existing: IGuidePerGuideByLanguagePriceRow[] = [],
	apiCategories?: TGuideByLanguageCategoryBackend[] | null
): IGuidePerGuideByLanguagePriceRow[] => {
	if (guidesListLength <= 0) {
		return [];
	}

	if (existing.length === guidesListLength) {
		return existing;
	}

	// Language categories belong to guide slot 0 — guides.length ≠ languages.length.
	if (apiCategories?.length && existing.length === 0) {
		const primary: IGuidePerGuideByLanguagePriceRow = {
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: apiCategories.map(
				mapCategoryRowFromBackend
			)
		};

		return Array.from({ length: guidesListLength }, (_, index) =>
			index === 0 ? primary : createEmptyPerGuideByLanguagePriceRow()
		);
	}

	return Array.from({ length: guidesListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		return createEmptyPerGuideByLanguagePriceRow();
	});
};

const mapMarkupToBackend = (
	markup: IGuidePriceRowMarkup | null,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE | undefined,
	addMarginSeparately: boolean
): TCommissionMarkupInputBackend | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_GUIDE_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	if (!rowCurrency) return null;
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: currencyConverter.to(rowCurrency)!
		}
	};
};

const applyMarkupToPerGuideExpenses = (
	expenses: IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses,
	addMarginSeparately: boolean
): IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses => {
	if (addMarginSeparately) {
		return expenses;
	}

	if (expenses.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE) {
		return {
			...expenses,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: expenses[
				ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES
			].map((guide) => ({
				...guide,
				[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
			}))
		};
	}

	return {
		...expenses,
		[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: expenses[
			ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES
		].map((guide) => ({
			...guide,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: guide[
				ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES
			].map((category) => ({
				...category,
				[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
			}))
		}))
	};
};

const hasAnyMarkup = (
	rows: {
		[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: IGuidePriceRowMarkup | null;
	}[]
) => rows.some((row) => row[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]?.value);

const toFiniteNumber = (value: unknown): number | null => {
	if (value == null || value === "") return null;
	const parsed = typeof value === "number" ? value : Number(value);
	return Number.isFinite(parsed) ? parsed : null;
};

const hasFeeRows = (fees: IFeeFormRow[] | undefined): boolean =>
	(fees ?? []).some(
		(fee) => fee.cost != null && Number.isFinite(fee.cost) && fee.cost !== 0
	);

const mapRowToBackendCategory = (
	row: IGuidePerGuidePriceRow | IGuideCategoryPriceRow,
	addMargin: boolean,
	lang?: string
): TGuideByLanguageCategoryInputBackend | null => {
	const rowCurrency = row[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY];
	const cost = toFiniteNumber(row[ENUM_GUIDE_PRICE_ROW_FIELD.COST]);
	const feesRows = row[ENUM_GUIDE_PRICE_ROW_FIELD.FEES] ?? [];
	const hasCost = cost != null && cost !== 0;
	const hasFees = hasFeeRows(feesRows);

	const langCode =
		"lang" in row && row.lang
			? languageMapper.to(row.lang as typeof ENUM_LANGUAGES.ENGLISH)
			: lang
				? languageMapper.to(lang as typeof ENUM_LANGUAGES.ENGLISH)
				: undefined;

	const markup = mapMarkupToBackend(
		row[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP],
		rowCurrency,
		addMargin
	);

	if (!langCode && !hasCost && !hasFees && !markup) {
		return null;
	}

	const tiers = mapGuideGroupTiersToBackend(
		hasCost ? (cost as number) : 0,
		rowCurrency
	);

	const chargeTyp =
		row[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP] ??
		ENUM_GUIDE_CHARGE.PER_DURATION;

	let expenses: TGuideCategoryChargeInputBackend | undefined;
	if (hasCost || hasFees || markup) {
		if (chargeTyp === ENUM_GUIDE_CHARGE.FIXED) {
			const fixed: Extract<
				TGuideCategoryChargeInputBackend,
				{ typ: "fixed" }
			> = {
				typ: "fixed",
				cost: {
					val: hasCost ? (cost as number) : 0,
					...(rowCurrency && {
						currency: currencyConverter.to(rowCurrency)!
					})
				},
				fees: mapFeesToBackend(feesRows),
				...(markup && { markup })
			};
			expenses = fixed;
		} else {
			const perDuration: Extract<
				TGuideCategoryChargeInputBackend,
				{ typ: "per_duration" }
			> = {
				typ: "per_duration",
				rate: {
					typ: "per_group",
					tiers: tiers ?? [
						{
							up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
							cost: { val: 0 }
						}
					]
				},
				fees: mapFeesToBackend(feesRows),
				...(markup && { markup })
			};
			expenses = perDuration;
		}
	}

	return {
		...(langCode && { lang: langCode }),
		...(expenses && { expenses })
	};
};

export const alignGuidePerGuideExpenses = (options: {
	priceByLanguage: boolean;
	guidesListLength: number;
	current?: TGuidePricingSchema["expenses"] | null;
	addMarginSeparately?: boolean;
}): IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses => {
	const { priceByLanguage, guidesListLength, current, addMarginSeparately } =
		options;

	let aligned: IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses;

	if (priceByLanguage) {
		const existing =
			current?.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY
				? current[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]
				: [];

		aligned = {
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]:
				alignPerGuideByLanguagePriceRows(guidesListLength, existing)
		};
	} else {
		const existing =
			current?.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE
				? current[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]
				: [];

		aligned = {
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]:
				alignPerGuidePriceRows(guidesListLength, existing)
		};
	}

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerGuideExpenses(aligned, addMarginSeparately);
};

export const getDefaultGuidePricing = (
	guidesList: TGuidesList = []
): TGuidePricingSchema => ({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
		ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]: ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
	[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: alignGuidePerGuideExpenses({
		priceByLanguage: true,
		guidesListLength: guidesList.length
	}),
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
});

export const mapGuidePricingFromBackend = (
	details?: TGuideDetailsBackend | null,
	guidesList: TGuidesList = []
): TGuidePricingSchema => {
	// Contract 3.1: language categories live on `details.spec`.
	const categories = details?.spec?.categories ?? [];
	const defaults = getDefaultGuidePricing(guidesList);

	if (!categories.length) {
		return defaults;
	}

	const hasMultipleCategories = categories.length > 1;
	const priceByLanguage =
		hasMultipleCategories ||
		Boolean(categories[0]?.lang && categories.length >= 1);

	if (priceByLanguage) {
		const guides = alignPerGuideByLanguagePriceRows(
			Math.max(guidesList.length, 1),
			[],
			categories
		);
		const flatCategories = guides.flatMap(
			(guide) => guide[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]
		);

		return {
			...defaults,
			[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
			[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(flatCategories),
			[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
				typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
				[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: guides
			}
		};
	}

	const guides = alignPerGuidePriceRows(
		Math.max(guidesList.length, 1),
		[],
		categories
	);

	return {
		...defaults,
		[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: false,
		[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: hasAnyMarkup(guides),
		[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: guides
		}
	};
};

export const mapGuideCategoriesToBackend = (
	pricing?: TGuidePricingSchema,
	guidesListLength = 0
): TGuideByLanguageCategoryInputBackend[] => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL ||
		pricing.pricing_type !== ENUM_GUIDE_PRICING_TYPE.PER_GUIDE
	) {
		return [];
	}

	const addMargin = pricing.add_margin_separately;
	const aligned = alignGuidePerGuideExpenses({
		priceByLanguage: pricing.price_by_language,
		guidesListLength,
		current: pricing.expenses
	});

	if (aligned.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY) {
		return aligned[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES].flatMap(
			(guide) =>
				guide[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]
					.map((category) =>
						mapRowToBackendCategory(category, addMargin)
					)
					.filter(Boolean) as TGuideByLanguageCategoryInputBackend[]
		);
	}

	return aligned[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]
		.map((row) => mapRowToBackendCategory(row, addMargin))
		.filter(Boolean) as TGuideByLanguageCategoryInputBackend[];
};
