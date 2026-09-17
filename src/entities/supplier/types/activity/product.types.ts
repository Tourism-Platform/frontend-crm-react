import type { ISupplierLocation } from "../supplier-location.types";
import { ENUM_SUPPLIER_TYPE } from "../supplier-type.types";
import type { TSupplierVariantCharge } from "../supplier-variant-charge.types";

import type { ENUM_ACTIVITY_SUB_TYPE_TYPE } from "./activity-sub-type.types";
import type { IActivityMenuItem } from "./menu.types";

export interface IActivityVariant {
	id: string;
	name: string;
	expenses: TSupplierVariantCharge | null;
	menu?: IActivityMenuItem[];
}

export interface IActivityProduct {
	id: string;
	supplierId: string;
	supplierName: string | null;
	typ: typeof ENUM_SUPPLIER_TYPE.ACTIVITY;
	name: string;
	subTyp: ENUM_ACTIVITY_SUB_TYPE_TYPE | null;
	location: ISupplierLocation | null;
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: IActivityVariant[];
}

export interface IActivityProductCreate {
	name: string;
	subTyp: ENUM_ACTIVITY_SUB_TYPE_TYPE;
	location?: ISupplierLocation | null;
}

export interface IActivityVariantWrite {
	name: string;
	expenses: TSupplierVariantCharge;
	menu?: IActivityMenuItem[];
}
