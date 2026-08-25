import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission/types/currency.types";

export const ENUM_SUPPLIER_SURCHARGE = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_SUPPLIER_SURCHARGE_TYPE =
	(typeof ENUM_SUPPLIER_SURCHARGE)[keyof typeof ENUM_SUPPLIER_SURCHARGE];

export interface IMonetaryValue {
	val: number;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface ISupplierFixedExpense {
	typ: typeof ENUM_SUPPLIER_SURCHARGE.FIXED;
	cost: IMonetaryValue;
}

export interface ISupplierPercentageSurcharge {
	typ: typeof ENUM_SUPPLIER_SURCHARGE.PERCENTAGE;
	percentage: number;
}

export type TSupplierSurcharge =
	| ISupplierFixedExpense
	| ISupplierPercentageSurcharge;
