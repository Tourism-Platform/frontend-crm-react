import { ENUM_SUPPLIER_TYPE } from "../supplier-type.types";
import type {
	ISupplierFixedCharge,
	TSupplierVariantCharge
} from "../supplier-variant-charge.types";
import type { ENUM_VEHICLE_BODY_TYPE_TYPE } from "../vehicle-body.types";

export const ENUM_BUS_PRICING = {
	PER_VEHICLE: "per_vehicle",
	WHOLE: "whole"
} as const;

export type ENUM_BUS_PRICING_TYPE =
	(typeof ENUM_BUS_PRICING)[keyof typeof ENUM_BUS_PRICING];

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
	supplierName: string | null;
	typ: typeof ENUM_SUPPLIER_TYPE.BUS;
	name: string;
	pricing: ENUM_BUS_PRICING_TYPE;
	/** Fleet-level charge of a whole-priced fleet; null for per-vehicle ones. */
	charge: TSupplierVariantCharge | null;
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: IBusVariant[];
}

export interface IBusProductCreate {
	name: string;
}

export interface IBusVariantWrite {
	name: string;
	bodyType: ENUM_VEHICLE_BODY_TYPE_TYPE;
	pax: number;
	description: string | null;
	expenses: ISupplierFixedCharge;
}
