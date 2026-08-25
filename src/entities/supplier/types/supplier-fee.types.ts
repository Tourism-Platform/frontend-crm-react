import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission/types/currency.types";

export const ENUM_SUPPLIER_FEE_FIELD = {
	NAME: "name",
	COST: "cost",
	CURRENCY: "currency",
	DESCRIPTION: "description"
} as const;

export type ENUM_SUPPLIER_FEE_FIELD_TYPE =
	(typeof ENUM_SUPPLIER_FEE_FIELD)[keyof typeof ENUM_SUPPLIER_FEE_FIELD];

export interface ISupplierFeeFormRow {
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: string | null;
	[ENUM_SUPPLIER_FEE_FIELD.COST]: number | null;
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: ENUM_CURRENCY_OPTIONS_TYPE | null;
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: string | null;
}

export const createEmptySupplierFeeRow = (): ISupplierFeeFormRow => ({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: null,
	[ENUM_SUPPLIER_FEE_FIELD.COST]: null,
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: null,
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: null
});
