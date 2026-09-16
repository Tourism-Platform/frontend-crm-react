export const ENUM_FORM_HOTEL_SECTION = {
	GENERAL: "general",
	ROOMS: "rooms",
	PRICING: "pricing"
} as const;

export type ENUM_FORM_HOTEL_SECTION_TYPE =
	(typeof ENUM_FORM_HOTEL_SECTION)[keyof typeof ENUM_FORM_HOTEL_SECTION];
