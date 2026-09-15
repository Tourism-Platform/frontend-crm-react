import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type { ENUM_SUPPLIER_SURCHARGE_TYPE } from "../supplier-money.types";

export const ENUM_TRANSFER_PRODUCT_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_CAR: "per_car",
	PER_PERSON: "per_person"
} as const;

export type ENUM_TRANSFER_PRODUCT_PRICING_TYPE_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_PRICING_TYPE)[keyof typeof ENUM_TRANSFER_PRODUCT_PRICING_TYPE];

export const ENUM_TRANSFER_PRODUCT_EXPENSE_TYP = {
	PER_CAR: "per_car",
	PER_CAR_CATEGORY: "per_car_category"
} as const;

export type ENUM_TRANSFER_PRODUCT_EXPENSE_TYP_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_EXPENSE_TYP)[keyof typeof ENUM_TRANSFER_PRODUCT_EXPENSE_TYP];

export const ENUM_TRANSFER_PRODUCT_PRICING_FIELD = {
	PRICING_TYPE: "pricing_type",
	PRICE_BASED_ON_CLASS: "price_based_on_class",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	EXPENSES: "expenses",
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_TRANSFER_PRODUCT_PRICING_FIELD_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_PRICING_FIELD)[keyof typeof ENUM_TRANSFER_PRODUCT_PRICING_FIELD];

export const ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD = {
	COST: "cost",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD)[keyof typeof ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD];

export const ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD = {
	NAME: "name",
	COST: ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST,
	FEES: ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.FEES,
	CURRENCY: ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY,
	MARKUP: ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP
} as const;

export type ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD)[keyof typeof ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD];

export const ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD = {
	CARS: "cars",
	CATEGORIES: "categories"
} as const;

export type ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD)[keyof typeof ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD];

export interface ITransferProductPriceRowMarkup {
	typ: ENUM_SUPPLIER_SURCHARGE_TYPE;
	value: string;
}

export interface ITransferProductPerCarPriceRow {
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST]: number | null;
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.FEES]: ISupplierFeeFormRow[];
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY]?: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]: ITransferProductPriceRowMarkup | null;
}

export interface ITransferProductCategoryPriceRow
	extends ITransferProductPerCarPriceRow {
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]: string;
}

export interface ITransferProductPerCarExpenses {
	typ: typeof ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR;
	[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: ITransferProductPerCarPriceRow[];
}

export interface ITransferProductPerCarByClassPriceRow {
	[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]: ITransferProductCategoryPriceRow[];
}

export interface ITransferProductPerCarCategoryExpenses {
	typ: typeof ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY;
	[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: ITransferProductPerCarByClassPriceRow[];
}
