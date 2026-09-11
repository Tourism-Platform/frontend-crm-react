import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";
import type { ISupplierFixedCharge } from "../supplier-variant-charge.types";
import type { ENUM_VEHICLE_BODY_TYPE_TYPE } from "../vehicle-body.types";

export interface ITransferVariant {
	id: string;
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE | null;
	pax: number | null;
	description: string | null;
	expenses: ISupplierFixedCharge | null;
}

export interface ITransferProduct {
	id: string;
	supplierId: string;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	name: string;
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: ITransferVariant[];
}

export interface ITransferProductCreate {
	name: string;
}

export interface ITransferVariantWrite {
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE | null;
	pax: number | null;
	description: string | null;
	expenses: ISupplierFixedCharge | null;
}
