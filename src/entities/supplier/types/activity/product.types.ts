import type { ISupplierLocation } from "../supplier-location.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";
import type { TSupplierVariantCharge } from "../supplier-variant-charge.types";

import type { ENUM_ACTIVITY_SUB_TYPE_TYPE } from "./activity-sub-type.types";

export interface IActivityVariant {
	id: string;
	name: string;
	expenses: TSupplierVariantCharge | null;
}

export interface IActivityProduct {
	id: string;
	supplierId: string;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
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
}
