import {
	ToPerFareTypEnum,
	ToWholeRouteTypEnum
} from "@/shared/api/generated/Api";

import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_FLIGHT_PRICING,
	ENUM_FLIGHT_VARIANT_CHARGE,
	ENUM_FORM_FLIGHT_FARES,
	ENUM_FORM_FLIGHT_SECTION,
	ENUM_SUPPLIER_SURCHARGE,
	type IFlightProduct,
	type IFlightVariant,
	type TFlightPricingSwitchBackend,
	type TFlightProductEditSchema,
	type TFlightProductPricingSchema,
	type TFlightVariantCharge,
	type TSupplierSurcharge
} from "../../types";
import {
	ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_FLIGHT_PRODUCT_PRICING_FIELD,
	ENUM_FLIGHT_PRODUCT_PRICING_TYPE,
	type IFlightProductFarePriceRow,
	type IFlightProductPriceRowMarkup
} from "../../types/flight/pricing-form.types";

import { mapFlightVariantChargeToBackend } from "./product.converters";

const mapMarkupToForm = (
	markup?: TSupplierSurcharge | null
): IFlightProductPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapMarkupFormToDomain = (
	markup: IFlightProductPriceRowMarkup | null | undefined,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	addMarginSeparately: boolean
): TSupplierSurcharge | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: Number(markup.value) / 100
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		cost: { val: Number(markup.value), currency }
	};
};

export const createEmptyFlightFarePriceRow = (
	variantId = ""
): IFlightProductFarePriceRow => ({
	[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]: variantId,
	[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP]:
		ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
	[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.COST]: null,
	[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: null
});

const applyMarkupToFares = (
	fares: IFlightProductFarePriceRow[],
	addMarginSeparately: boolean
): IFlightProductFarePriceRow[] => {
	if (addMarginSeparately) {
		return fares;
	}

	return fares.map((fare) => ({
		...fare,
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: null
	}));
};

export const alignFlightPerFareRows = (options: {
	faresList: { variant_id: string }[];
	current?: IFlightProductFarePriceRow[];
	addMarginSeparately?: boolean;
}): IFlightProductFarePriceRow[] => {
	const { faresList, current = [], addMarginSeparately } = options;
	const byId = new Map(
		current.map((row) => [
			row[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID],
			row
		])
	);

	const aligned = faresList.map((fare) => {
		const existing = byId.get(fare.variant_id);
		if (existing) {
			return {
				...existing,
				[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]:
					fare.variant_id
			};
		}
		return createEmptyFlightFarePriceRow(fare.variant_id);
	});

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToFares(aligned, addMarginSeparately);
};

const hasAnyMarkup = (rows: IFlightProductFarePriceRow[]) =>
	rows.some(
		(row) => row[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]?.value
	);

const mapFarePriceFromVariant = (
	variant: IFlightVariant
): IFlightProductFarePriceRow => {
	const expenses = variant.expenses;
	if (!expenses) {
		return createEmptyFlightFarePriceRow(variant.id);
	}

	const money =
		expenses.typ === ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]: variant.id,
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP]: expenses.typ,
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.COST]: money?.val ?? null,
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.FEES]: expenses.fees ?? [],
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: mapMarkupToForm(
			expenses.markup
		)
	};
};

export const mapFlightPricingFromProduct = (
	product: IFlightProduct | null | undefined,
	faresList: { variant_id: string }[]
): TFlightProductPricingSchema => {
	const defaults: TFlightProductPricingSchema = {
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_FLIGHT_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.FARES]: alignFlightPerFareRows({
			faresList
		}),
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.FEES]: [],
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.MARKUP]: null
	};

	if (!product) {
		return defaults;
	}

	if (product.pricing === ENUM_FLIGHT_PRICING.PER_FARE) {
		const fares = product.variants.map(mapFarePriceFromVariant);
		return {
			...defaults,
			[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_FLIGHT_PRODUCT_PRICING_TYPE.PER_FARE,
			[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(fares),
			[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.FARES]: alignFlightPerFareRows({
				faresList,
				current: fares
			})
		};
	}

	const charge = product.charge;
	if (!charge) {
		return {
			...defaults,
			[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_FLIGHT_PRODUCT_PRICING_TYPE.FLAT_RATE
		};
	}

	const markup = mapMarkupToForm(charge.markup);
	const money =
		charge.typ === ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON
			? charge.costPerPerson
			: charge.cost;

	return {
		...defaults,
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			charge.typ === ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON
				? ENUM_FLIGHT_PRODUCT_PRICING_TYPE.PER_PERSON
				: ENUM_FLIGHT_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
			markup?.value
		),
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.MARKUP]: markup,
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.TOTAL_PRICE]: money?.val ?? null,
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.FEES]: charge.fees ?? [],
		[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY
	};
};

const mapFareRowToCharge = (
	row: IFlightProductFarePriceRow | undefined,
	addMarginSeparately: boolean
): TFlightVariantCharge => {
	const currency =
		row?.[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = row?.[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.FEES] ?? [];
	const money = {
		val: row?.[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.COST] ?? 0,
		currency
	};
	const markup = mapMarkupFormToDomain(
		row?.[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP] ?? null,
		currency,
		addMarginSeparately
	);
	const feesValue = fees.length ? fees : null;

	if (
		row?.[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP] ===
		ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON
	) {
		return {
			typ: ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees: feesValue,
			markup
		};
	}

	return {
		typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
		cost: money,
		fees: feesValue,
		markup
	};
};

const mapWholeCharge = (
	pricing: TFlightProductPricingSchema
): TFlightVariantCharge => {
	const currency =
		pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.FEES] ?? [];
	const money = {
		val: pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.TOTAL_PRICE] ?? 0,
		currency
	};
	const markup = mapMarkupFormToDomain(
		pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
	);
	const feesValue = fees.length ? fees : null;

	if (
		pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.PRICING_TYPE] ===
		ENUM_FLIGHT_PRODUCT_PRICING_TYPE.PER_PERSON
	) {
		return {
			typ: ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees: feesValue,
			markup
		};
	}

	return {
		typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
		cost: money,
		fees: feesValue,
		markup
	};
};

export const mapFlightEditFormToPricingSwitch = (
	values: TFlightProductEditSchema
): TFlightPricingSwitchBackend => {
	const fares =
		values[ENUM_FORM_FLIGHT_SECTION.FARES][
			ENUM_FORM_FLIGHT_FARES.FARES_LIST
		];
	const pricing = values[ENUM_FORM_FLIGHT_SECTION.PRICING];
	const addMargin =
		pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY];
	const pricingType = pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.PRICING_TYPE];

	if (pricingType === ENUM_FLIGHT_PRODUCT_PRICING_TYPE.PER_FARE) {
		const aligned = alignFlightPerFareRows({
			faresList: fares.map((fare) => ({
				variant_id: fare[ENUM_FORM_FLIGHT_FARES.VARIANT_ID]
			})),
			current: pricing[ENUM_FLIGHT_PRODUCT_PRICING_FIELD.FARES]
		});

		return {
			typ: ToPerFareTypEnum.Flight,
			to: ENUM_FLIGHT_PRICING.PER_FARE,
			fares: aligned.map((row) => ({
				variant_id:
					row[ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID],
				charge: mapFlightVariantChargeToBackend(
					mapFareRowToCharge(row, addMargin)
				)
			}))
		};
	}

	return {
		typ: ToWholeRouteTypEnum.Flight,
		to: ENUM_FLIGHT_PRICING.WHOLE,
		charge: mapFlightVariantChargeToBackend(mapWholeCharge(pricing))
	};
};

export const isFlightWholePricingType = (
	pricingType: TFlightProductPricingSchema["pricing_type"]
) =>
	pricingType === ENUM_FLIGHT_PRODUCT_PRICING_TYPE.FLAT_RATE ||
	pricingType === ENUM_FLIGHT_PRODUCT_PRICING_TYPE.PER_PERSON;
