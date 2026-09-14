import {
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_PRODUCT as ENUM_FORM,
	ENUM_FORM_BUS_PRICING as ENUM_PRICING,
	type IBusProduct,
	type IUpdateBusProduct,
	type TBusProductDetailsBackend,
	type TBusProductGeneralSchema,
	type TBusProductPricingSchema,
	type TCreateBusProductBackend,
	type TUpdateBusProductBackend
} from "../../types";
import { mapSupplierVariantChargeToBackend } from "../supplier-variant-charge.converters";

import {
	mapBusChargeFormToExpenses,
	mapBusExpensesToChargeForm
} from "./variant-form.converters";

export const mapBusProductToGeneralForm = (
	product?: IBusProduct | null
): TBusProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? ""
});

const mapGeneralFormToDetails = (
	values: TBusProductGeneralSchema,
	existing: IBusProduct | null | undefined
): TBusProductDetailsBackend => {
	const name = values[ENUM_FORM.NAME];

	if (existing?.pricing === ENUM_BUS_PRICING.WHOLE) {
		if (!existing.charge) {
			throw new Error(
				"Cannot update a whole-priced bus fleet without its charge"
			);
		}
		return {
			name,
			pricing: ENUM_BUS_PRICING.WHOLE,
			charge: mapSupplierVariantChargeToBackend(existing.charge)
		};
	}

	return { name, pricing: ENUM_BUS_PRICING.PER_VEHICLE };
};

export const mapBusProductGeneralToCreate = (
	values: TBusProductGeneralSchema
): TCreateBusProductBackend => ({
	typ: "bus",
	details: mapGeneralFormToDetails(values, null)
});

export const mapBusProductGeneralToUpdate = (
	values: TBusProductGeneralSchema,
	existing?: IBusProduct | null
): TUpdateBusProductBackend => ({
	typ: "bus",
	details: mapGeneralFormToDetails(values, existing)
});

export const mapBusProductToPricingForm = (
	product?: IBusProduct | null
): TBusProductPricingSchema => ({
	[ENUM_PRICING.PRICING]: product?.pricing ?? ENUM_BUS_PRICING.PER_VEHICLE,
	...mapBusExpensesToChargeForm(product?.charge)
});

export const mapBusProductPricingToUpdate = (
	product: IBusProduct,
	values: TBusProductPricingSchema
): TUpdateBusProductBackend => {
	const pricing = values[ENUM_PRICING.PRICING];
	const charge =
		pricing === ENUM_BUS_PRICING.WHOLE
			? mapBusChargeFormToExpenses(values)
			: null;

	return mapBusProductGeneralToUpdate(mapBusProductToGeneralForm(product), {
		...product,
		pricing,
		charge
	});
};

export const mapBusProductToUpdate = ({
	values,
	existing,
	pricing
}: IUpdateBusProduct): TUpdateBusProductBackend => {
	if (pricing && existing) {
		return mapBusProductPricingToUpdate(existing, pricing);
	}

	return mapBusProductGeneralToUpdate(values, existing);
};
