import { ENUM_SUPPLIER_TYPE } from "../supplier-type.types";
import type {
	ISupplierFixedCharge,
	TSupplierVariantCharge
} from "../supplier-variant-charge.types";
import type { ENUM_VEHICLE_BODY_TYPE_TYPE } from "../vehicle-body.types";

export const ENUM_TRANSFER_PRICING = {
	PER_CAR: "per_car",
	PER_CAR_CATEGORY: "per_car_category",
	WHOLE: "whole"
} as const;

export type ENUM_TRANSFER_PRICING_TYPE =
	(typeof ENUM_TRANSFER_PRICING)[keyof typeof ENUM_TRANSFER_PRICING];

export interface ITransferCarCategory {
	id: string;
	name: string | null;
	expenses: ISupplierFixedCharge;
}

export interface ITransferVariant {
	id: string;
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE | null;
	pax: number | null;
	description: string | null;
	expenses: ISupplierFixedCharge | null;
	categories: ITransferCarCategory[];
}

export interface ITransferProduct {
	id: string;
	supplierId: string;
	supplierName: string | null;
	typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
	name: string;
	pricing: ENUM_TRANSFER_PRICING_TYPE;
	/** Fleet-level charge of a whole-priced fleet; null for per-car ones. */
	charge: TSupplierVariantCharge | null;
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: ITransferVariant[];
}

export interface ITransferProductCreate {
	name: string;
}

export interface ITransferCarCategoryWrite {
	id?: string;
	name: string | null;
	expenses: ISupplierFixedCharge;
}

export interface ITransferVariantWrite {
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE;
	pax: number;
	description: string | null;
	expenses: ISupplierFixedCharge;
	categories: ITransferCarCategoryWrite[];
}
