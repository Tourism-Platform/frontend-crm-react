import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";
import type { ISupplierFixedCharge } from "../supplier-variant-charge.types";
import type { ENUM_VEHICLE_BODY_TYPE_TYPE } from "../vehicle-body.types";

export interface IBusVariant {
	id: string;
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE | null;
	pax: number | null;
	description: string | null;
	expenses: ISupplierFixedCharge | null;
}

export interface IBusProduct {
	id: string;
	supplierId: string;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	name: string;
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: IBusVariant[];
}

export interface IBusProductCreate {
	name: string;
}

export interface IBusVariantWrite {
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE | null;
	pax: number | null;
	description: string | null;
	expenses: ISupplierFixedCharge | null;
}
