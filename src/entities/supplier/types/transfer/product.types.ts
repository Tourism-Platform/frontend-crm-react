import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";
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

export interface ITransferVariantWrite {
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE;
	pax: number;
	description: string | null;
	expenses: ISupplierFixedCharge;
}
