export const ENUM_FLIGHT_PRICING_INVOICING = {
	INDIVIDUAL: "individual",
	PART_OF_PACKAGE: "part_of_package"
} as const;

export type ENUM_FLIGHT_PRICING_INVOICING_TYPE =
	(typeof ENUM_FLIGHT_PRICING_INVOICING)[keyof typeof ENUM_FLIGHT_PRICING_INVOICING];

export const ENUM_FLIGHT_PRICING_TYPE = {
	FLAT_RATE: "flat_rate",
	PER_PERSON: "per_person"
} as const;

export type ENUM_FLIGHT_PRICING_TYPE_TYPE =
	(typeof ENUM_FLIGHT_PRICING_TYPE)[keyof typeof ENUM_FLIGHT_PRICING_TYPE];

export const ENUM_FLIGHT_MARKUP_TYP = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_FLIGHT_MARKUP_TYP_TYPE =
	(typeof ENUM_FLIGHT_MARKUP_TYP)[keyof typeof ENUM_FLIGHT_MARKUP_TYP];

export const ENUM_FLIGHT_PRICING_FIELD = {
	INVOICING: "invoicing",
	PRICING_TYPE: "pricing_type",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	TOTAL_PRICE: "total_price",
	TAXES: "taxes",
	CURRENCY: "currency",
	MARKUP: "markup",
	PACKAGE_ID: "package_id"
} as const;

export type ENUM_FLIGHT_PRICING_FIELD_TYPE =
	(typeof ENUM_FLIGHT_PRICING_FIELD)[keyof typeof ENUM_FLIGHT_PRICING_FIELD];

export interface IFlightPriceRowMarkup {
	typ: ENUM_FLIGHT_MARKUP_TYP_TYPE;
	value: string;
}
