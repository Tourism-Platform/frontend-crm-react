export const ENUM_FORM_FLIGHT_SECTION = {
	GENERAL: "general",
	FARES: "fares",
	PRICING: "pricing"
} as const;

export type ENUM_FORM_FLIGHT_SECTION_TYPE =
	(typeof ENUM_FORM_FLIGHT_SECTION)[keyof typeof ENUM_FORM_FLIGHT_SECTION];
