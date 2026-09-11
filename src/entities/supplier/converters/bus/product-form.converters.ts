import {
	ENUM_FORM_BUS_PRODUCT as ENUM_FORM,
	type IBusProduct,
	type TBusProductGeneralSchema,
	type TCreateBusProductBackend,
	type TUpdateBusProductBackend
} from "../../types";

export const mapBusProductToGeneralForm = (
	product?: IBusProduct | null
): TBusProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? ""
});

export const mapBusProductGeneralToCreate = (
	values: TBusProductGeneralSchema
): TCreateBusProductBackend => ({
	typ: "bus",
	name: values[ENUM_FORM.NAME],
	details: { typ: "bus" }
});

export const mapBusProductGeneralToUpdate = (
	values: TBusProductGeneralSchema
): TUpdateBusProductBackend => ({
	typ: "bus",
	name: values[ENUM_FORM.NAME],
	details: { typ: "bus" }
});
