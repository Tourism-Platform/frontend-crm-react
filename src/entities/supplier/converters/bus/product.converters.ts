import {
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type IBusProductCreate,
	type IBusVariant,
	type IBusVariantWrite,
	type TBusProductReadBackend,
	type TBusVariantReadBackend,
	type TBusVariantWriteBackend,
	type TCreateBusProductBackend
} from "../../types";
import {
	mapSupplierFixedChargeFromBackend,
	mapSupplierFixedChargeToBackend
} from "../supplier-variant-charge.converters";
import { vehicleBodyTypeConverter } from "../vehicle-body.converters";

const emptyToNull = (value: string | null | undefined): string | null => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
};

export const mapBusVariantFromBackend = (
	variant: TBusVariantReadBackend
): IBusVariant => ({
	id: variant.id,
	name: variant.name,
	bodyType: vehicleBodyTypeConverter.from(variant.body_type) ?? null,
	pax: variant.pax ?? null,
	description: variant.description ?? null,
	expenses: mapSupplierFixedChargeFromBackend(variant.expenses)
});

export const mapBusVariantToWrite = (
	data: IBusVariantWrite
): TBusVariantWriteBackend => ({
	typ: "bus",
	name: data.name,
	details: {
		typ: "bus",
		body_type: vehicleBodyTypeConverter.to(data.bodyType) ?? null,
		pax: data.pax,
		description: emptyToNull(data.description),
		expenses: data.expenses
			? mapSupplierFixedChargeToBackend(data.expenses)
			: null
	}
});

export const mapBusProductFromBackend = (
	row: TBusProductReadBackend
): IBusProduct => ({
	id: row.id,
	supplierId: row.supplier_id,
	typ: ENUM_SUPPLIER_TYPE.BUS,
	name: row.name,
	imagePaths: row.image_paths ?? [],
	primaryImagePath: row.primary_image_path ?? null,
	variants: (row.variants ?? []).map(mapBusVariantFromBackend)
});

export const mapBusProductToCreate = (
	data: IBusProductCreate
): TCreateBusProductBackend => ({
	typ: "bus",
	name: data.name,
	details: { typ: "bus" }
});
