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

export const ENUM_FLIGHT_PRICING_FIELD = {
	INVOICING: "invoicing",
	PRICING_TYPE: "pricing_type",
	TOTAL_PRICE: "total_price",
	TAXES: "taxes",
	CURRENCY: "currency",
	PACKAGE_TYPE: "package_type"
} as const;

export type ENUM_FLIGHT_PRICING_FIELD_TYPE =
	(typeof ENUM_FLIGHT_PRICING_FIELD)[keyof typeof ENUM_FLIGHT_PRICING_FIELD];
