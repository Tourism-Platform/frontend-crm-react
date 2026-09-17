import {
	ENUM_FORM_TRANSFER_PRODUCT as ENUM_FORM,
	ENUM_TRANSFER_PRICING,
	type ITransferProduct,
	type TCreateTransferProductBackend,
	type TTransferProductDetailsBackend,
	type TTransferProductGeneralSchema,
	type TUpdateTransferProductBackend
} from "../../types";
import { mapSupplierVariantChargeToBackend } from "../supplier-variant-charge.converters";

export const mapTransferProductToGeneralForm = (
	product?: ITransferProduct | null
): TTransferProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? ""
});

const mapFleetCategoriesToDetails = (
	fleetCategories: ITransferProduct["fleetCategories"]
) =>
	fleetCategories.map((category) => ({
		...(category.id ? { id: category.id } : {}),
		name: category.name
	}));

const mapGeneralFormToDetails = (
	values: TTransferProductGeneralSchema,
	existing: ITransferProduct | null | undefined
): TTransferProductDetailsBackend => {
	const name = values[ENUM_FORM.NAME];

	switch (existing?.pricing) {
		case ENUM_TRANSFER_PRICING.WHOLE:
			if (!existing.charge) {
				throw new Error(
					"Cannot update a whole-priced transfer fleet without its charge"
				);
			}
			return {
				name,
				pricing: ENUM_TRANSFER_PRICING.WHOLE,
				charge: mapSupplierVariantChargeToBackend(existing.charge)
			};
		case ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY:
			return {
				name,
				pricing: ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY,
				categories: mapFleetCategoriesToDetails(
					existing?.fleetCategories ?? []
				)
			};
		default:
			return { name, pricing: ENUM_TRANSFER_PRICING.PER_CAR };
	}
};

export const mapTransferProductGeneralToCreate = (
	values: TTransferProductGeneralSchema
): TCreateTransferProductBackend => ({
	typ: "transfer",
	details: mapGeneralFormToDetails(values, null)
});

export const mapTransferProductGeneralToUpdate = (
	values: TTransferProductGeneralSchema,
	existing: ITransferProduct | null | undefined
): TUpdateTransferProductBackend => ({
	typ: "transfer",
	details: mapGeneralFormToDetails(values, existing)
});
