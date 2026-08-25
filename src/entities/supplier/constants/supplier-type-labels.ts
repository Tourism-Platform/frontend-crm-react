import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "../types/supplier-type.types";

export const SUPPLIER_TYPE_LABELS: Record<
	ENUM_SUPPLIER_TYPE_TYPE,
	`supplier_type.${ENUM_SUPPLIER_TYPE_TYPE}`
> = {
	[ENUM_SUPPLIER_TYPE.FLIGHT]: "supplier_type.flight",
	[ENUM_SUPPLIER_TYPE.HOTEL]: "supplier_type.hotel",
	[ENUM_SUPPLIER_TYPE.MUSEUM]: "supplier_type.museum",
	[ENUM_SUPPLIER_TYPE.TRANSFER]: "supplier_type.transfer",
	[ENUM_SUPPLIER_TYPE.ACTIVITY]: "supplier_type.activity",
	[ENUM_SUPPLIER_TYPE.TRAIN]: "supplier_type.train",
	[ENUM_SUPPLIER_TYPE.BUS]: "supplier_type.bus"
};
