import {
	ENUM_SUPPLIER_TYPE,
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
	mapSupplierFixedChargeToBackend
} from "../supplier-variant-charge.converters";
import { vehicleBodyTypeConverter } from "../vehicle-body.converters";

const emptyToNull = (value: string | null | undefined): string | null => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
};

export const mapTransferVariantFromBackend = (
	variant: TTransferVariantReadBackend
): ITransferVariant => ({
	id: variant.id,
	name: variant.name,
	bodyType: vehicleBodyTypeConverter.from(variant.body_type) ?? null,
	pax: variant.pax ?? null,
	description: variant.description ?? null,
	expenses: mapSupplierFixedChargeFromBackend(variant.expenses)
});

export const mapTransferVariantToWrite = (
	data: ITransferVariantWrite
): TTransferVariantWriteBackend => ({
	typ: "transfer",
	name: data.name,
	details: {
		typ: "transfer",
		body_type: vehicleBodyTypeConverter.to(data.bodyType) ?? null,
		pax: data.pax,
		description: emptyToNull(data.description),
		expenses: data.expenses
			? mapSupplierFixedChargeToBackend(data.expenses)
			: null
	}
});

export const mapTransferProductFromBackend = (
	row: TTransferProductReadBackend
): ITransferProduct => ({
	id: row.id,
	supplierId: row.supplier_id,
	typ: ENUM_SUPPLIER_TYPE.TRANSFER,
	name: row.name,
	imagePaths: row.image_paths ?? [],
	primaryImagePath: row.primary_image_path ?? null,
	variants: (row.variants ?? []).map(mapTransferVariantFromBackend)
});

export const mapTransferProductToCreate = (
	data: ITransferProductCreate
): TCreateTransferProductBackend => ({
	typ: "transfer",
	name: data.name,
	details: { typ: "transfer" }
});
