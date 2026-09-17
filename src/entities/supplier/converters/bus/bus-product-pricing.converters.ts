import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_SECTION,
	ENUM_FORM_BUS_VEHICLES,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IBusProduct,
	type IBusVariant,
	type ISupplierFixedCharge,
	type TBusPricingSwitchBackend,
	type TBusProductEditSchema,
	type TBusProductPricingSchema,
	type TSupplierSurcharge,
	type TSupplierVariantCharge
} from "../../types";
import {
	ENUM_BUS_PRODUCT_PRICING_FIELD,
	ENUM_BUS_PRODUCT_PRICING_TYPE,
	ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD,
	type IBusProductPriceRowMarkup,
	type IBusProductVehiclePriceRow
} from "../../types/bus/pricing-form.types";
import {
	mapSupplierFixedChargeToBackend,
	mapSupplierVariantChargeToBackend
} from "../supplier-variant-charge.converters";

const mapMarkupToForm = (
	markup?: TSupplierSurcharge | null
): IBusProductPriceRowMarkup | null => {
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
	markup: IBusProductPriceRowMarkup | null | undefined,
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

export const createEmptyBusVehiclePriceRow = (
	variantId = ""
): IBusProductVehiclePriceRow => ({
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID]: variantId,
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.COST]: null,
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP]: null
});

const applyMarkupToVehicles = (
	vehicles: IBusProductVehiclePriceRow[],
	addMarginSeparately: boolean
): IBusProductVehiclePriceRow[] => {
	if (addMarginSeparately) {
		return vehicles;
	}

	return vehicles.map((vehicle) => ({
		...vehicle,
		[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP]: null
	}));
};

export const alignBusPerVehicleRows = (options: {
	vehiclesList: { variant_id: string }[];
	current?: IBusProductVehiclePriceRow[];
	addMarginSeparately?: boolean;
}): IBusProductVehiclePriceRow[] => {
	const { vehiclesList, current = [], addMarginSeparately } = options;
	const byId = new Map(
		current.map((row) => [
			row[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID],
			row
		])
	);

	const aligned = vehiclesList.map((vehicle) => {
		const existing = byId.get(vehicle.variant_id);
		if (existing) {
			return {
				...existing,
				[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID]:
					vehicle.variant_id
			};
		}
		return createEmptyBusVehiclePriceRow(vehicle.variant_id);
	});

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToVehicles(aligned, addMarginSeparately);
};

const hasAnyMarkup = (rows: IBusProductVehiclePriceRow[]) =>
	rows.some(
		(row) => row[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP]?.value
	);

const mapVehiclePriceFromVariant = (
	variant: IBusVariant
): IBusProductVehiclePriceRow => {
	const expenses = variant.expenses;
	if (!expenses) {
		return createEmptyBusVehiclePriceRow(variant.id);
	}

	return {
		[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID]: variant.id,
		[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.COST]:
			expenses.cost?.val ?? null,
		[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.FEES]: expenses.fees ?? [],
		[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.CURRENCY]:
			expenses.cost?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP]: mapMarkupToForm(
			expenses.markup
		)
	};
};

export const mapBusPricingFromProduct = (
	product: IBusProduct | null | undefined,
	vehiclesList: { variant_id: string }[]
): TBusProductPricingSchema => {
	const defaults: TBusProductPricingSchema = {
		[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_BUS_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES]: alignBusPerVehicleRows({
			vehiclesList
		}),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.FEES]: [],
		[ENUM_BUS_PRODUCT_PRICING_FIELD.MARKUP]: null
	};

	if (!product) {
		return defaults;
	}

	if (product.pricing === ENUM_BUS_PRICING.PER_VEHICLE) {
		const vehicles = product.variants.map(mapVehiclePriceFromVariant);
		return {
			...defaults,
			[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_BUS_PRODUCT_PRICING_TYPE.PER_VEHICLE,
			[ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(vehicles),
			[ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES]: alignBusPerVehicleRows({
				vehiclesList,
				current: vehicles
			})
		};
	}

	const charge = product.charge;
	if (!charge) {
		return {
			...defaults,
			[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_BUS_PRODUCT_PRICING_TYPE.FLAT_RATE
		};
	}

	const markup = mapMarkupToForm(charge.markup);
	const money =
		charge.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
			? charge.costPerPerson
			: charge.cost;

	return {
		...defaults,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			charge.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
				? ENUM_BUS_PRODUCT_PRICING_TYPE.PER_PERSON
				: ENUM_BUS_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
			markup?.value
		),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.MARKUP]: markup,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.TOTAL_PRICE]: money?.val ?? null,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.FEES]: charge.fees ?? [],
		[ENUM_BUS_PRODUCT_PRICING_FIELD.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY
	};
};

const mapVehicleRowToFixedCharge = (
	row: IBusProductVehiclePriceRow | undefined,
	addMarginSeparately: boolean
): ISupplierFixedCharge => {
	const currency =
		row?.[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = row?.[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.FEES] ?? [];

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: {
			val: row?.[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.COST] ?? 0,
			currency
		},
		fees: fees.length ? fees : null,
		markup: mapMarkupFormToDomain(
			row?.[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP] ?? null,
			currency,
			addMarginSeparately
		)
	};
};

const mapWholeCharge = (
	pricing: TBusProductPricingSchema
): TSupplierVariantCharge => {
	const currency =
		pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.FEES] ?? [];
	const money = {
		val: pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.TOTAL_PRICE] ?? 0,
		currency
	};
	const markup = mapMarkupFormToDomain(
		pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
	);
	const feesValue = fees.length ? fees : null;

	if (
		pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE] ===
		ENUM_BUS_PRODUCT_PRICING_TYPE.PER_PERSON
	) {
		return {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees: feesValue,
			markup
		};
	}

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: money,
		fees: feesValue,
		markup
	};
};

export const mapBusEditFormToPricingSwitch = (
	values: TBusProductEditSchema
): TBusPricingSwitchBackend => {
	const vehicles =
		values[ENUM_FORM_BUS_SECTION.VEHICLES][
			ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST
		];
	const pricing = values[ENUM_FORM_BUS_SECTION.PRICING];
	const addMargin =
		pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY];
	const pricingType = pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE];

	if (pricingType === ENUM_BUS_PRODUCT_PRICING_TYPE.PER_VEHICLE) {
		const aligned = alignBusPerVehicleRows({
			vehiclesList: vehicles.map((vehicle) => ({
				variant_id: vehicle[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]
			})),
			current: pricing[ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES]
		});

		return {
			typ: "bus",
			to: ENUM_BUS_PRICING.PER_VEHICLE,
			vehicles: aligned.map((row) => ({
				variant_id:
					row[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID],
				charge: mapSupplierFixedChargeToBackend(
					mapVehicleRowToFixedCharge(row, addMargin)
				)
			}))
		};
	}

	return {
		typ: "bus",
		to: ENUM_BUS_PRICING.WHOLE,
		charge: mapSupplierVariantChargeToBackend(mapWholeCharge(pricing))
	};
};

export const isBusWholePricingType = (
	pricingType: TBusProductPricingSchema["pricing_type"]
) =>
	pricingType === ENUM_BUS_PRODUCT_PRICING_TYPE.FLAT_RATE ||
	pricingType === ENUM_BUS_PRODUCT_PRICING_TYPE.PER_PERSON;
