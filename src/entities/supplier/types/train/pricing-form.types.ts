import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type { ENUM_SUPPLIER_SURCHARGE_TYPE } from "../supplier-money.types";

import type { ENUM_TRAIN_VARIANT_CHARGE_TYPE } from "./product.types";

export const ENUM_TRAIN_PRODUCT_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_FARE: "per_fare",
	PER_PERSON: "per_person"
} as const;

export type ENUM_TRAIN_PRODUCT_PRICING_TYPE_TYPE =
	(typeof ENUM_TRAIN_PRODUCT_PRICING_TYPE)[keyof typeof ENUM_TRAIN_PRODUCT_PRICING_TYPE];

export const ENUM_TRAIN_PRODUCT_PRICING_FIELD = {
	PRICING_TYPE: "pricing_type",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	FARES: "fares",
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_TRAIN_PRODUCT_PRICING_FIELD_TYPE =
	(typeof ENUM_TRAIN_PRODUCT_PRICING_FIELD)[keyof typeof ENUM_TRAIN_PRODUCT_PRICING_FIELD];

export const ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD = {
	VARIANT_ID: "variant_id",
	CHARGE_TYP: "charge_typ",
	COST: "cost",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD)[keyof typeof ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD];

export interface ITrainProductPriceRowMarkup {
	typ: ENUM_SUPPLIER_SURCHARGE_TYPE;
	value: string;
}

export interface ITrainProductFarePriceRow {
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]: string;
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP]: ENUM_TRAIN_VARIANT_CHARGE_TYPE;
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.COST]: number | null;
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.FEES]: ISupplierFeeFormRow[];
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY]?: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: ITrainProductPriceRowMarkup | null;
}
