import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

export const ENUM_GUIDE_PRICING_INVOICING = {
	INDIVIDUAL: "individual",
	PART_OF_PACKAGE: "part_of_package"
} as const;

export type ENUM_GUIDE_PRICING_INVOICING_TYPE =
	(typeof ENUM_GUIDE_PRICING_INVOICING)[keyof typeof ENUM_GUIDE_PRICING_INVOICING];

export const ENUM_GUIDE_PRICING_TYPE = {
	PER_GUIDE: "per_guide"
} as const;

export type ENUM_GUIDE_PRICING_TYPE_TYPE =
	(typeof ENUM_GUIDE_PRICING_TYPE)[keyof typeof ENUM_GUIDE_PRICING_TYPE];

export const ENUM_GUIDE_EXPENSE_TYP = {
	PER_GUIDE: "per_guide",
	PER_GUIDE_CATEGORY: "per_guide_category"
} as const;

export type ENUM_GUIDE_EXPENSE_TYP_TYPE =
	(typeof ENUM_GUIDE_EXPENSE_TYP)[keyof typeof ENUM_GUIDE_EXPENSE_TYP];

export const ENUM_GUIDE_MARKUP_TYP = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_GUIDE_MARKUP_TYP_TYPE =
	(typeof ENUM_GUIDE_MARKUP_TYP)[keyof typeof ENUM_GUIDE_MARKUP_TYP];

export const ENUM_GUIDE_PRICING_FIELD = {
	INVOICING: "invoicing",
	PRICING_TYPE: "pricing_type",
	PRICE_BY_LANGUAGE: "price_by_language",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	EXPENSES: "expenses",
	PACKAGE_TYPE: "package_type"
} as const;

export type ENUM_GUIDE_PRICING_FIELD_TYPE =
	(typeof ENUM_GUIDE_PRICING_FIELD)[keyof typeof ENUM_GUIDE_PRICING_FIELD];

export const ENUM_GUIDE_PRICE_ROW_FIELD = {
	COST: "cost",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_GUIDE_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_GUIDE_PRICE_ROW_FIELD)[keyof typeof ENUM_GUIDE_PRICE_ROW_FIELD];

export const ENUM_GUIDE_CATEGORY_ROW_FIELD = {
	LANG: "lang",
	COST: ENUM_GUIDE_PRICE_ROW_FIELD.COST,
	FEES: ENUM_GUIDE_PRICE_ROW_FIELD.FEES,
	CURRENCY: ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY,
	MARKUP: ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP
} as const;

export type ENUM_GUIDE_CATEGORY_ROW_FIELD_TYPE =
	(typeof ENUM_GUIDE_CATEGORY_ROW_FIELD)[keyof typeof ENUM_GUIDE_CATEGORY_ROW_FIELD];

export const ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD = {
	GUIDES: "guides",
	CATEGORIES: "categories"
} as const;

export type ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD_TYPE =
	(typeof ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD)[keyof typeof ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD];

export interface IGuidePriceRowMarkup {
	typ: ENUM_GUIDE_MARKUP_TYP_TYPE;
	value: string;
}

export interface IGuidePerGuidePriceRow {
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: number | null;
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: number | null;
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]?: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: IGuidePriceRowMarkup | null;
}

export interface IGuideCategoryPriceRow extends IGuidePerGuidePriceRow {
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: string;
}

export interface IGuidePerGuideExpenses {
	typ: typeof ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE;
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: IGuidePerGuidePriceRow[];
}

export interface IGuidePerGuideByLanguagePriceRow {
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: IGuideCategoryPriceRow[];
}

export interface IGuidePerGuideCategoryExpenses {
	typ: typeof ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY;
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: IGuidePerGuideByLanguagePriceRow[];
}

export type { TGuidePricingSchema } from "../../schema/guide/pricing.schema";
