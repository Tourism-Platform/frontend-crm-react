import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type { ENUM_SUPPLIER_SURCHARGE_TYPE } from "../supplier-money.types";

export const ENUM_BUS_PRODUCT_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_VEHICLE: "per_vehicle",
	PER_PERSON: "per_person"
} as const;

export type ENUM_BUS_PRODUCT_PRICING_TYPE_TYPE =
	(typeof ENUM_BUS_PRODUCT_PRICING_TYPE)[keyof typeof ENUM_BUS_PRODUCT_PRICING_TYPE];

export const ENUM_BUS_PRODUCT_PRICING_FIELD = {
	PRICING_TYPE: "pricing_type",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	VEHICLES: "vehicles",
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_BUS_PRODUCT_PRICING_FIELD_TYPE =
	(typeof ENUM_BUS_PRODUCT_PRICING_FIELD)[keyof typeof ENUM_BUS_PRODUCT_PRICING_FIELD];

export const ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD = {
	VARIANT_ID: "variant_id",
	COST: "cost",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD)[keyof typeof ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD];

export interface IBusProductPriceRowMarkup {
	typ: ENUM_SUPPLIER_SURCHARGE_TYPE;
	value: string;
}

export interface IBusProductVehiclePriceRow {
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID]: string;
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.COST]: number | null;
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.FEES]: ISupplierFeeFormRow[];
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.CURRENCY]?: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP]: IBusProductPriceRowMarkup | null;
}
