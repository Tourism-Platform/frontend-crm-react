import { Currency } from "@/shared/api";
import type { FixedChargeInput, PerPersonChargeInput } from "@/shared/api";

import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_FLIGHT_MARKUP_TYP,
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE,
	type IFlightPriceRowMarkup,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TFlightPricingSchema,
	type TTransportDetailsWithPricingBackend
} from "../../../types";
import { getPoolMember } from "../common/event-pool.helpers";
import {
	mapFeesFromBackend,
	mapFeesToBackend
} from "../common/fees.converters";

/** Write-side whole-route/fleet charge (contract 3.1 `spec.charge`). */
export type TWholeRouteChargeInput = FixedChargeInput | PerPersonChargeInput;

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): IFlightPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_FLIGHT_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapMarkupToBackend = (
	markup: IFlightPriceRowMarkup | null,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE,
	addMarginSeparately: boolean
): TCommissionMarkupInputBackend | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_FLIGHT_MARKUP_TYP.PERCENTAGE) {
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

const getDefaultFlightPricing = (): TFlightPricingSchema => ({
	invoicing: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
	pricing_type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
	add_margin_separately: false,
	markup: null,
	package_id: ""
});

/**
 * Pricing section of the form, read from the selected pool member spec.
 * Only a whole route/fleet (`spec.pricing === "whole"`) carries an
 * event-stated charge the form can show; per-fare / per-vehicle specs
 * price their own units, which the event form does not edit — those read
 * as the default (unpriced) pricing.
 */
export const mapFlightPricingFromBackend = (
	details?: TTransportDetailsWithPricingBackend | null,
	supplyId?: string | null
): TFlightPricingSchema => {
	const defaults = getDefaultFlightPricing();
	const spec = getPoolMember(details, supplyId)?.spec;

	if (!spec || spec.pricing !== "whole") {
		return defaults;
	}

	const charge = spec.charge;
	const fees = mapFeesFromBackend(charge.fees);

	if (charge.typ === "fixed") {
		const markup = mapMarkupFromBackend(charge.markup);
		return {
			...defaults,
			pricing_type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: markup,
			...(charge.cost?.val != null && {
				total_price: charge.cost.val
			}),
			[ENUM_FLIGHT_PRICING_FIELD.FEES]: fees,
			...(charge.cost?.currency && {
				currency: currencyConverter.from(charge.cost.currency)
			})
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(charge.markup);
	return {
		...defaults,
		pricing_type: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: perPersonMarkup,
		...(charge.cost_per_person?.val != null && {
			total_price: charge.cost_per_person.val
		}),
		[ENUM_FLIGHT_PRICING_FIELD.FEES]: fees,
		...(charge.cost_per_person?.currency && {
			currency: currencyConverter.from(charge.cost_per_person.currency)
		})
	};
};

/**
 * The charge for a whole route/fleet spec (contract 3.1). The caller
 * assembles the spec: with a charge it is `{ pricing: "whole", charge }`;
 * without one the route is stated as `{ pricing: "per_fare" | "per_vehicle" }`
 * carrying no prices of its own.
 */
export const mapFlightPricingToBackend = (
	pricing?: TFlightPricingSchema
): { charge?: TWholeRouteChargeInput } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL
	) {
		return {};
	}

	const totalPrice = pricing[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_FLIGHT_PRICING_FIELD.CURRENCY];
	const fees = mapFeesToBackend(pricing[ENUM_FLIGHT_PRICING_FIELD.FEES]);

	if (totalPrice == null || !currency) {
		return {};
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency) ?? Currency.USD
	};
	const markup = mapMarkupToBackend(
		pricing[ENUM_FLIGHT_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);

	if (pricing.pricing_type === ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE) {
		return {
			charge: { typ: "fixed", cost, fees, markup }
		};
	}

	return {
		charge: { typ: "per_person", cost_per_person: cost, fees, markup }
	};
};
