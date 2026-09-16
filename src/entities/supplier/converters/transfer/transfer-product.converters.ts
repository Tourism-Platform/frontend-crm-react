import {
	ENUM_SUPPLIER_TYPE,
	ENUM_TRANSFER_PRICING,
	type ENUM_TRANSFER_PRICING_TYPE,
	type ITransferCarCategory,
	type ITransferProduct,
	type ITransferProductCreate,
	type ITransferVariant,
	type ITransferVariantWrite,
	type TCreateTransferProductBackend,
	type TTransferProductReadBackend,
	type TTransferVariantReadBackend,
	type TTransferVariantWriteBackend
} from "../../types";
import {
	mapSupplierFixedChargeFromBackend,
	mapSupplierFixedChargeToBackend,
	mapSupplierVariantChargeFromBackend
} from "../supplier-variant-charge.converters";
import { vehicleBodyTypeConverter } from "../vehicle-body.converters";

const emptyToNull = (value: string | null | undefined): string | null => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
};

const mapCategoriesFromBackend = (
	variant: TTransferVariantReadBackend
): ITransferCarCategory[] => {
	if (!("categories" in variant) || !variant.categories) {
		return [];
	}

	return variant.categories.flatMap((category) => {
		const expenses = mapSupplierFixedChargeFromBackend(category.charge);
		if (!expenses) return [];

		return [
			{
				id: category.id,
				name: category.name ?? null,
				expenses
			}
		];
	});
};

export const mapTransferVariantFromBackend = (
	variant: TTransferVariantReadBackend
): ITransferVariant => ({
	id: variant.id ?? "",
	name: variant.name ?? "",
	bodyType: vehicleBodyTypeConverter.from(variant.body_type) ?? null,
	pax: variant.pax ?? null,
	description: variant.description ?? null,
	expenses:
		"charge" in variant
			? mapSupplierFixedChargeFromBackend(variant.charge)
			: null,
	categories: mapCategoriesFromBackend(variant)
});

export const mapTransferVariantToWrite = (
	data: ITransferVariantWrite,
	pricing: ENUM_TRANSFER_PRICING_TYPE
): TTransferVariantWriteBackend => {
	const base = {
		name: data.name,
		body_type: vehicleBodyTypeConverter.to(data.bodyType)!,
		pax: data.pax,
		description: emptyToNull(data.description)
	};

	switch (pricing) {
		case ENUM_TRANSFER_PRICING.WHOLE:
			return {
				...base,
				typ: "transfer",
				pricing: ENUM_TRANSFER_PRICING.WHOLE
			};
		case ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY:
			return {
				...base,
				typ: "transfer",
				pricing: ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY,
				categories: data.categories.map((category) => ({
					...(category.id ? { id: category.id } : {}),
					name: category.name,
					charge: mapSupplierFixedChargeToBackend(category.expenses)
				}))
			};
		default:
			return {
				...base,
				typ: "transfer",
				pricing: ENUM_TRANSFER_PRICING.PER_CAR,
				charge: mapSupplierFixedChargeToBackend(data.expenses)
			};
	}
};

export const mapTransferProductFromBackend = (
	row: TTransferProductReadBackend
): ITransferProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		supplierName: row.supplier_name ?? null,
		typ: ENUM_SUPPLIER_TYPE.TRANSFER,
		name: spec.name ?? row.name,
		pricing: spec.pricing,
		charge:
			spec.pricing === ENUM_TRANSFER_PRICING.WHOLE
				? mapSupplierVariantChargeFromBackend(spec.charge)
				: null,
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.cars.map(mapTransferVariantFromBackend)
	};
};

export const mapTransferProductToCreate = (
	data: ITransferProductCreate
): TCreateTransferProductBackend => ({
	typ: "transfer",
	details: {
		pricing: ENUM_TRANSFER_PRICING.PER_CAR,
		name: data.name
	}
});
