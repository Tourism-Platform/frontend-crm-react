import { SupplierType } from "@/shared/api/generated/Api";

export const ENUM_SUPPLIER_TYPE_BACKEND = {
	FLIGHT: SupplierType.Flight,
	HOTEL: SupplierType.Hotel,
	MUSEUM: SupplierType.Museum,
	TRANSFER: SupplierType.Transfer,
	ACTIVITY: SupplierType.Activity,
	TRAIN: SupplierType.Train,
	BUS: SupplierType.Bus
} as const;

export type ENUM_SUPPLIER_TYPE_BACKEND_TYPE =
	(typeof ENUM_SUPPLIER_TYPE_BACKEND)[keyof typeof ENUM_SUPPLIER_TYPE_BACKEND];
