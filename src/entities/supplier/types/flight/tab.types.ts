export const ENUM_FLIGHT_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	FARES: "fares",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_FLIGHT_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB)[keyof typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB];
