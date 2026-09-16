import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type { ENUM_SUPPLIER_SURCHARGE_TYPE } from "../supplier-money.types";

export const ENUM_HOTEL_PRODUCT_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_ROOM: "per_room",
	PER_PERSON: "per_person"
} as const;

export type ENUM_HOTEL_PRODUCT_PRICING_TYPE_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_PRICING_TYPE)[keyof typeof ENUM_HOTEL_PRODUCT_PRICING_TYPE];

export const ENUM_HOTEL_PRODUCT_EXPENSE_TYP = {
	PER_ROOM: "per_room",
	PER_ROOM_CATEGORY: "per_room_category"
} as const;

export type ENUM_HOTEL_PRODUCT_EXPENSE_TYP_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_EXPENSE_TYP)[keyof typeof ENUM_HOTEL_PRODUCT_EXPENSE_TYP];

export const ENUM_HOTEL_PRODUCT_PRICING_FIELD = {
	PRICING_TYPE: "pricing_type",
	PRICE_BASED_ON_CLASS: "price_based_on_class",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	EXPENSES: "expenses",
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_HOTEL_PRODUCT_PRICING_FIELD_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_PRICING_FIELD)[keyof typeof ENUM_HOTEL_PRODUCT_PRICING_FIELD];

export const ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD = {
	COST: "cost",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD)[keyof typeof ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD];

export const ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD = {
	NAME: "name",
	COST: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST,
	FEES: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES,
	CURRENCY: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY,
	MARKUP: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP
} as const;

export type ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD)[keyof typeof ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD];

export const ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD = {
	ROOMS: "rooms",
	CATEGORIES: "categories"
} as const;

export type ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD)[keyof typeof ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD];

export interface IHotelProductPriceRowMarkup {
	typ: ENUM_SUPPLIER_SURCHARGE_TYPE;
	value: string;
}

export interface IHotelProductPerRoomPriceRow {
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST]: number | null;
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES]: ISupplierFeeFormRow[];
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY]?: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: IHotelProductPriceRowMarkup | null;
}

export interface IHotelProductCategoryPriceRow
	extends IHotelProductPerRoomPriceRow {
	[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.NAME]: string;
}

export interface IHotelProductPerRoomExpenses {
	typ: typeof ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM;
	[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]: IHotelProductPerRoomPriceRow[];
}

export interface IHotelProductPerRoomByClassPriceRow {
	[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: IHotelProductCategoryPriceRow[];
}

export interface IHotelProductPerRoomCategoryExpenses {
	typ: typeof ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM_CATEGORY;
	[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]: IHotelProductPerRoomByClassPriceRow[];
}
