import {
	ENUM_SUPPLIER_TYPE,
	type IActivityProduct,
	type IActivityProductCreate,
	type IActivityVariant,
	type IActivityVariantWrite,
	type TActivityProductReadBackend,
	type TActivityVariantReadBackend,
	type TActivityVariantWriteBackend,
	type TCreateActivityProductBackend
} from "../../types";
import {
	mapSupplierLocationFromBackend,
	mapSupplierLocationToBackend
} from "../supplier-location.converters";
import {
	mapSupplierVariantChargeFromBackend,
	mapSupplierVariantChargeToBackend
} from "../supplier-variant-charge.converters";

import { activitySubTypeConverter } from "./activity-sub-type.converters";

export const mapActivityVariantFromBackend = (
	variant: TActivityVariantReadBackend
): IActivityVariant => ({
	id: variant.id,
	name: variant.name,
	expenses: mapSupplierVariantChargeFromBackend(variant.expenses)
});

export const mapActivityVariantToWrite = (
	data: IActivityVariantWrite
): TActivityVariantWriteBackend => ({
	typ: "activity",
	name: data.name,
	details: {
		typ: "activity",
		expenses: data.expenses
			? mapSupplierVariantChargeToBackend(data.expenses)
			: null,
		menu: null
	}
});

export const mapActivityProductFromBackend = (
	row: TActivityProductReadBackend
): IActivityProduct => ({
	id: row.id,
	supplierId: row.supplier_id,
	typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
	name: row.name,
	subTyp: activitySubTypeConverter.from(row.sub_typ) ?? null,
	location: mapSupplierLocationFromBackend(row.location ?? null),
	imagePaths: row.image_paths ?? [],
	primaryImagePath: row.primary_image_path ?? null,
	variants: (row.variants ?? []).map(mapActivityVariantFromBackend)
});

export const mapActivityProductToCreate = (
	data: IActivityProductCreate
): TCreateActivityProductBackend => ({
	typ: "activity",
	name: data.name,
	details: {
		typ: "activity",
		sub_typ: activitySubTypeConverter.to(data.subTyp) ?? null,
		location: mapSupplierLocationToBackend(data.location)
	}
});
