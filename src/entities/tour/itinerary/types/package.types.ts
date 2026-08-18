import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

export const TOUR_PACKAGE_CREATE_ID = "new";

export const ENUM_PACKAGE_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_PERSON: "per_person"
} as const;

export type ENUM_PACKAGE_PRICING_TYPE_TYPE =
	(typeof ENUM_PACKAGE_PRICING_TYPE)[keyof typeof ENUM_PACKAGE_PRICING_TYPE];

export const ENUM_PACKAGE_MARKUP_TYP = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_PACKAGE_MARKUP_TYP_TYPE =
	(typeof ENUM_PACKAGE_MARKUP_TYP)[keyof typeof ENUM_PACKAGE_MARKUP_TYP];

export const ENUM_PACKAGE_FIELD = {
	NAME: "name",
	PRICING_TYPE: "pricing_type",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	TOTAL_PRICE: "total_price",
	TAXES: "taxes",
	CURRENCY: "currency",
	MARKUP: "markup",
	SUPPLIER_ID: "supplier_id"
} as const;

export type ENUM_PACKAGE_FIELD_TYPE =
	(typeof ENUM_PACKAGE_FIELD)[keyof typeof ENUM_PACKAGE_FIELD];

export interface IPackageMarkup {
	typ: ENUM_PACKAGE_MARKUP_TYP_TYPE;
	value: string;
}

export interface ITourPackageListItem {
	id: string;
	name: string;
}

export interface ITourPackage extends ITourPackageListItem {
	tourOptionId: string;
	supplierId: string | null;
}

export interface IPackageFormMarkup {
	typ: ENUM_PACKAGE_MARKUP_TYP_TYPE;
	value: string;
}

export interface IPackageFormPayload {
	name: string;
	pricing_type: ENUM_PACKAGE_PRICING_TYPE_TYPE;
	add_margin_separately: boolean;
	total_price?: number | null;
	taxes?: number | null;
	currency?: ENUM_CURRENCY_OPTIONS_TYPE;
	markup?: IPackageFormMarkup | null;
	supplier_id?: string | null;
}
