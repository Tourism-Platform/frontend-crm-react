import { Currency } from "@/shared/api";
import type { FixedChargeInput, PerPersonChargeInput } from "@/shared/api";

import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_ACTIVITY_MARKUP_TYP,
	ENUM_ACTIVITY_PRICING_FIELD,
	ENUM_ACTIVITY_PRICING_INVOICING,
	ENUM_ACTIVITY_PRICING_TYPE,
	type IActivityPriceRowMarkup,
	type TActivityDetailsBackend,
	type TActivityPricingSchema,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend
} from "../../../types";
import { getPoolMember } from "../event-pool.helpers";
import { mapFeesFromBackend, mapFeesToBackend } from "../fees.converters";

/** Write-side venue offering charge (contract 3.1 `spec.offerings[].charge`). */
export type TActivityOfferingChargeInput =
	| FixedChargeInput
	| PerPersonChargeInput;

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): IActivityPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapMarkupToBackend = (
	markup: IActivityPriceRowMarkup | null,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE,
	addMarginSeparately: boolean
): TCommissionMarkupInputBackend | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: currencyConverter.to(rowCurrency) ?? Currency.USD
		}
	};
};

const getDefaultActivityPricing = (): TActivityPricingSchema => ({
	invoicing: ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
	pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
	add_margin_separately: false,
	markup: null,
	package_id: ""
});

/**
 * Pricing section of the form, read from the selected pool member spec.
 * A venue prices its offerings (`spec.offerings[].charge`); the event form
 * shows a single price, so the first offering's charge is read.
 */
export const mapActivityPricingFromBackend = (
	details?: TActivityDetailsBackend | null,
	supplyId?: string | null
): TActivityPricingSchema => {
	const defaults = getDefaultActivityPricing();
	const charge = getPoolMember(details, supplyId)?.spec?.offerings?.[0]
		?.charge;

	if (!charge) {
		return defaults;
	}

	const fees = mapFeesFromBackend(charge.fees);

	if (charge.typ === "fixed") {
		const markup = mapMarkupFromBackend(charge.markup);
		return {
			...defaults,
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: markup,
			...(charge.cost?.val != null && {
				total_price: charge.cost.val
			}),
			[ENUM_ACTIVITY_PRICING_FIELD.FEES]: fees,
			...(charge.cost?.currency && {
				currency: currencyConverter.from(charge.cost.currency)
			})
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(charge.markup);
	return {
		...defaults,
		pricing_type: ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: perPersonMarkup,
		...(charge.cost_per_person?.val != null && {
			total_price: charge.cost_per_person.val
		}),
		[ENUM_ACTIVITY_PRICING_FIELD.FEES]: fees,
		...(charge.cost_per_person?.currency && {
			currency: currencyConverter.from(charge.cost_per_person.currency)
		})
	};
};

/**
 * The charge for the venue's single form offering (contract 3.1). The
 * caller assembles `spec.offerings` — a food venue also hangs its menu on
 * the offering, so it may need a zero-valued charge to keep the menu (see
 * the event converter).
 */
export const mapActivityPricingToBackend = (
	pricing?: TActivityPricingSchema
): { charge?: TActivityOfferingChargeInput } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL
	) {
		return {};
	}

	const totalPrice = pricing[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY];
	const fees = mapFeesToBackend(pricing[ENUM_ACTIVITY_PRICING_FIELD.FEES]);

	if (totalPrice == null || !currency) {
		return {};
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency) ?? Currency.USD
	};
	const markup = mapMarkupToBackend(
		pricing[ENUM_ACTIVITY_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);

	if (pricing.pricing_type === ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE) {
		return {
			charge: { typ: "fixed", cost, fees, markup }
		};
	}

	return {
		charge: { typ: "per_person", cost_per_person: cost, fees, markup }
	};
};
