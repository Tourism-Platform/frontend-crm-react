export const ENUM_SUPPLEMENT_PRICING_INVOICING = {
	INDIVIDUAL: "individual",
	PART_OF_PACKAGE: "part_of_package"
} as const;

export type ENUM_SUPPLEMENT_PRICING_INVOICING_TYPE =
	(typeof ENUM_SUPPLEMENT_PRICING_INVOICING)[keyof typeof ENUM_SUPPLEMENT_PRICING_INVOICING];

/** Same values as Transfer UI model: flat_rate | per_item | per_person */
export const ENUM_SUPPLEMENT_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_ITEM: "per_item",
	PER_PERSON: "per_person"
} as const;

export type ENUM_SUPPLEMENT_PRICING_TYPE_TYPE =
	(typeof ENUM_SUPPLEMENT_PRICING_TYPE)[keyof typeof ENUM_SUPPLEMENT_PRICING_TYPE];

export const ENUM_SUPPLEMENT_MARKUP_TYP = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_SUPPLEMENT_MARKUP_TYP_TYPE =
	(typeof ENUM_SUPPLEMENT_MARKUP_TYP)[keyof typeof ENUM_SUPPLEMENT_MARKUP_TYP];

export const ENUM_SUPPLEMENT_PRICING_FIELD = {
	INVOICING: "invoicing",
	PRICING_TYPE: "pricing_type",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	EXPENSES: "expenses",
	TOTAL_PRICE: "total_price",
	TAXES: "taxes",
	CURRENCY: "currency",
	PACKAGE_TYPE: "package_type"
} as const;

export type ENUM_SUPPLEMENT_PRICING_FIELD_TYPE =
	(typeof ENUM_SUPPLEMENT_PRICING_FIELD)[keyof typeof ENUM_SUPPLEMENT_PRICING_FIELD];

export const ENUM_SUPPLEMENT_PRICE_ROW_FIELD = {
	COST: "cost",
	FEES: "fees",
	CURRENCY: "currency",
	MARKUP: "markup"
} as const;

export type ENUM_SUPPLEMENT_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_SUPPLEMENT_PRICE_ROW_FIELD)[keyof typeof ENUM_SUPPLEMENT_PRICE_ROW_FIELD];

export const ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD = {
	ITEMS: "items"
} as const;

export type ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD_TYPE =
	(typeof ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD)[keyof typeof ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD];

export interface ISupplementPriceRowMarkup {
	typ: ENUM_SUPPLEMENT_MARKUP_TYP_TYPE;
	value: string;
}

export interface ISupplementPerItemPriceRow {
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: number | null;
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]: number | null;
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]: string;
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: ISupplementPriceRowMarkup | null;
}

export interface ISupplementPerItemExpenses {
	typ: typeof ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM;
	[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: ISupplementPerItemPriceRow[];
}
