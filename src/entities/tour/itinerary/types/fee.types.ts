import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

export const ENUM_FEE_FIELD = {
	NAME: "name",
	COST: "cost",
	CURRENCY: "currency",
	DESCRIPTION: "description"
} as const;

export type ENUM_FEE_FIELD_TYPE =
	(typeof ENUM_FEE_FIELD)[keyof typeof ENUM_FEE_FIELD];

export interface IFeeFormRow {
	[ENUM_FEE_FIELD.NAME]: string | null;
	[ENUM_FEE_FIELD.COST]: number | null;
	[ENUM_FEE_FIELD.CURRENCY]: ENUM_CURRENCY_OPTIONS_TYPE | null;
	[ENUM_FEE_FIELD.DESCRIPTION]: string | null;
}

export const createEmptyFeeRow = (): IFeeFormRow => ({
	[ENUM_FEE_FIELD.NAME]: null,
	[ENUM_FEE_FIELD.COST]: null,
	[ENUM_FEE_FIELD.CURRENCY]: null,
	[ENUM_FEE_FIELD.DESCRIPTION]: null
});
