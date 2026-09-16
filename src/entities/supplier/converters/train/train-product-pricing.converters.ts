import {
	ToPerFareTypEnum,
	ToWholeRouteTypEnum
} from "@/shared/api/generated/Api";

import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_TRAIN_PRICING,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainProduct,
	type ITrainVariant,
	type TSupplierSurcharge,
	type TTrainPricingSwitchBackend,
	type TTrainProductEditSchema,
	type TTrainProductPricingSchema,
	type TTrainVariantCharge
} from "../../types";
import {
	ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_TYPE,
	type ITrainProductFarePriceRow,
	type ITrainProductPriceRowMarkup
} from "../../types/train/pricing-form.types";

import { mapTrainVariantChargeToBackend } from "./product.converters";

const mapMarkupToForm = (
	markup?: TSupplierSurcharge | null
): ITrainProductPriceRowMarkup | null => {
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
	markup: ITrainProductPriceRowMarkup | null | undefined,
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

export const createEmptyTrainFarePriceRow = (
	variantId = ""
): ITrainProductFarePriceRow => ({
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]: variantId,
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP]:
		ENUM_TRAIN_VARIANT_CHARGE.FIXED,
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.COST]: null,
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: null
});

const applyMarkupToFares = (
	fares: ITrainProductFarePriceRow[],
	addMarginSeparately: boolean
): ITrainProductFarePriceRow[] => {
	if (addMarginSeparately) {
		return fares;
	}

	return fares.map((fare) => ({
		...fare,
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: null
	}));
};

export const alignTrainPerFareRows = (options: {
	faresList: { variant_id: string }[];
	current?: ITrainProductFarePriceRow[];
	addMarginSeparately?: boolean;
}): ITrainProductFarePriceRow[] => {
	const { faresList, current = [], addMarginSeparately } = options;
	const byId = new Map(
		current.map((row) => [
			row[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID],
			row
		])
	);

	const aligned = faresList.map((fare) => {
		const existing = byId.get(fare.variant_id);
		if (existing) {
			return {
				...existing,
				[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]:
					fare.variant_id
			};
		}
		return createEmptyTrainFarePriceRow(fare.variant_id);
	});

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToFares(aligned, addMarginSeparately);
};

const hasAnyMarkup = (rows: ITrainProductFarePriceRow[]) =>
	rows.some(
		(row) => row[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]?.value
	);

const mapFarePriceFromVariant = (
	variant: ITrainVariant
): ITrainProductFarePriceRow => {
	const expenses = variant.expenses;
	if (!expenses) {
		return createEmptyTrainFarePriceRow(variant.id);
	}

	const money =
		expenses.typ === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]: variant.id,
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP]: expenses.typ,
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.COST]: money?.val ?? null,
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.FEES]: expenses.fees ?? [],
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: mapMarkupToForm(
			expenses.markup
		)
	};
};

export const mapTrainPricingFromProduct = (
	product: ITrainProduct | null | undefined,
	faresList: { variant_id: string }[]
): TTrainProductPricingSchema => {
	const defaults: TTrainProductPricingSchema = {
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_TRAIN_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES]: alignTrainPerFareRows({
			faresList
		}),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FEES]: [],
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.MARKUP]: null
	};

	if (!product) {
		return defaults;
	}

	if (product.pricing === ENUM_TRAIN_PRICING.PER_FARE) {
		const fares = product.variants.map(mapFarePriceFromVariant);
		return {
			...defaults,
			[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_FARE,
			[ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(fares),
			[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES]: alignTrainPerFareRows({
				faresList,
				current: fares
			})
		};
	}

	const charge = product.charge;
	if (!charge) {
		return {
			...defaults,
			[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRAIN_PRODUCT_PRICING_TYPE.FLAT_RATE
		};
	}

	const markup = mapMarkupToForm(charge.markup);
	const money =
		charge.typ === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
			? charge.costPerPerson
			: charge.cost;

	return {
		...defaults,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			charge.typ === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
				? ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_PERSON
				: ENUM_TRAIN_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
			markup?.value
		),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.MARKUP]: markup,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.TOTAL_PRICE]: money?.val ?? null,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FEES]: charge.fees ?? [],
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY
	};
};

const mapFareRowToCharge = (
	row: ITrainProductFarePriceRow | undefined,
	addMarginSeparately: boolean
): TTrainVariantCharge => {
	const currency =
		row?.[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = row?.[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.FEES] ?? [];
	const money = {
		val: row?.[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.COST] ?? 0,
		currency
	};
	const markup = mapMarkupFormToDomain(
		row?.[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP] ?? null,
		currency,
		addMarginSeparately
	);
	const feesValue = fees.length ? fees : null;

	if (
		row?.[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP] ===
		ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
	) {
		return {
			typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees: feesValue,
			markup
		};
	}

	return {
		typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
		cost: money,
		fees: feesValue,
		markup
	};
};

const mapWholeCharge = (
	pricing: TTrainProductPricingSchema
): TTrainVariantCharge => {
	const currency =
		pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FEES] ?? [];
	const money = {
		val: pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.TOTAL_PRICE] ?? 0,
		currency
	};
	const markup = mapMarkupFormToDomain(
		pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
	);
	const feesValue = fees.length ? fees : null;

	if (
		pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE] ===
		ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_PERSON
	) {
		return {
			typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees: feesValue,
			markup
		};
	}

	return {
		typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
		cost: money,
		fees: feesValue,
		markup
	};
};

export const mapTrainEditFormToPricingSwitch = (
	values: TTrainProductEditSchema
): TTrainPricingSwitchBackend => {
	const fares =
		values[ENUM_FORM_TRAIN_SECTION.FARES][ENUM_FORM_TRAIN_FARES.FARES_LIST];
	const pricing = values[ENUM_FORM_TRAIN_SECTION.PRICING];
	const addMargin =
		pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY];
	const pricingType = pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE];

	if (pricingType === ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_FARE) {
		const aligned = alignTrainPerFareRows({
			faresList: fares.map((fare) => ({
				variant_id: fare[ENUM_FORM_TRAIN_FARES.VARIANT_ID]
			})),
			current: pricing[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES]
		});

		return {
			typ: ToPerFareTypEnum.Train,
			to: ENUM_TRAIN_PRICING.PER_FARE,
			fares: aligned.map((row) => ({
				variant_id:
					row[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID],
				charge: mapTrainVariantChargeToBackend(
					mapFareRowToCharge(row, addMargin)
				)
			}))
		};
	}

	return {
		typ: ToWholeRouteTypEnum.Train,
		to: ENUM_TRAIN_PRICING.WHOLE,
		charge: mapTrainVariantChargeToBackend(mapWholeCharge(pricing))
	};
};

export const isTrainWholePricingType = (
	pricingType: TTrainProductPricingSchema["pricing_type"]
) =>
	pricingType === ENUM_TRAIN_PRODUCT_PRICING_TYPE.FLAT_RATE ||
	pricingType === ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_PERSON;
