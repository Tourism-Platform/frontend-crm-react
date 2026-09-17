import {
	ENUM_SUPPLIER_TYPE,
	ENUM_TRANSFER_PRICING,
	type ENUM_TRANSFER_PRICING_TYPE,
	type ITransferCarPrice,
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

const mapPricesFromBackend = (
	variant: TTransferVariantReadBackend
): ITransferCarPrice[] => {
	if (!("prices" in variant) || !variant.prices?.length) {
		return [];
	}

	return variant.prices.flatMap((price) => {
		const expenses = mapSupplierFixedChargeFromBackend(price.charge);
		if (!expenses) return [];

		return [
			{
				id: price.id,
				categoryId: price.category_id,
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
	prices: mapPricesFromBackend(variant)
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
				prices: data.prices.map((price) => ({
					...(price.id ? { id: price.id } : {}),
					category_id: price.categoryId,
					charge: mapSupplierFixedChargeToBackend(price.expenses)
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
	const fleetCategories =
		spec.pricing === ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY
			? (spec.categories ?? []).map((category) => ({
					id: category.id ?? "",
					name: category.name ?? null
				}))
			: [];

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
		fleetCategories,
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.cars.map((car) => mapTransferVariantFromBackend(car))
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
