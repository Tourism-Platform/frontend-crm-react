export const ENUM_FLIGHT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_FLIGHT_EDIT_TAB_TYPE =
	(typeof ENUM_FLIGHT_EDIT_TAB)[keyof typeof ENUM_FLIGHT_EDIT_TAB];
