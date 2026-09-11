import {
	ENUM_FORM_TRANSFER_PRODUCT as ENUM_FORM,
	type ITransferProduct,
	type TCreateTransferProductBackend,
	type TTransferProductGeneralSchema,
	type TUpdateTransferProductBackend
} from "../../types";

export const mapTransferProductToGeneralForm = (
	product?: ITransferProduct | null
): TTransferProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? ""
});

export const mapTransferProductGeneralToCreate = (
	values: TTransferProductGeneralSchema
): TCreateTransferProductBackend => ({
	typ: "transfer",
	name: values[ENUM_FORM.NAME],
	details: { typ: "transfer" }
});

export const mapTransferProductGeneralToUpdate = (
	values: TTransferProductGeneralSchema
): TUpdateTransferProductBackend => ({
	typ: "transfer",
	name: values[ENUM_FORM.NAME],
	details: { typ: "transfer" }
});
