import type { ISupplierFeeFormRow } from "./supplier-fee.types";
import type {
	IMonetaryValue,
	TSupplierSurcharge
} from "./supplier-money.types";

export const ENUM_SUPPLIER_VARIANT_CHARGE = {
	FIXED: "fixed",
	PER_PERSON: "per_person"
} as const;

export type ENUM_SUPPLIER_VARIANT_CHARGE_TYPE =
	(typeof ENUM_SUPPLIER_VARIANT_CHARGE)[keyof typeof ENUM_SUPPLIER_VARIANT_CHARGE];

export interface ISupplierFixedCharge {
	typ: typeof ENUM_SUPPLIER_VARIANT_CHARGE.FIXED;
	cost: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export interface ISupplierPerPersonCharge {
	typ: typeof ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON;
	costPerPerson: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export type TSupplierVariantCharge =
	| ISupplierFixedCharge
	| ISupplierPerPersonCharge;
