import { ActivityType } from "@/shared/api/generated/Api";

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

import {
	mapActivityMenuFromBackend,
	mapActivityMenuToBackend
} from "./activity-menu.converters";
import { activitySubTypeConverter } from "./activity-sub-type.converters";

export const mapActivityVariantFromBackend = (
	variant: TActivityVariantReadBackend
): IActivityVariant => ({
	id: variant.id,
	name: variant.name ?? "",
	expenses: mapSupplierVariantChargeFromBackend(variant.charge),
	...("menu" in variant
		? { menu: mapActivityMenuFromBackend(variant.menu) }
		: {})
});

export const mapActivityVariantToWrite = (
	data: IActivityVariantWrite
): TActivityVariantWriteBackend => {
	const menu = mapActivityMenuToBackend(data.menu);

	return {
		typ: "activity",
		name: data.name,
		charge: mapSupplierVariantChargeToBackend(data.expenses),
		...(menu ? { menu } : {})
	};
};

export const mapActivityProductFromBackend = (
	row: TActivityProductReadBackend
): IActivityProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		supplierName: row.supplier_name ?? null,
		typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
		name: spec.name ?? row.name,
		subTyp:
			activitySubTypeConverter.from(spec.sub_typ as ActivityType) ?? null,
		location: mapSupplierLocationFromBackend(spec.location ?? null),
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.offerings.map(mapActivityVariantFromBackend)
	};
};

export const mapActivityProductToCreate = (
	data: IActivityProductCreate
): TCreateActivityProductBackend => ({
	typ: "activity",
	details: {
		sub_typ: activitySubTypeConverter.to(data.subTyp)!,
		name: data.name,
		location: mapSupplierLocationToBackend(data.location ?? null)
	}
});
