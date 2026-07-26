export const ENUM_ACCOMMODATION_EDIT_TAB = {
	GENERAL: "general",
	ROOMS: "rooms",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_ACCOMMODATION_EDIT_TAB_TYPE =
	(typeof ENUM_ACCOMMODATION_EDIT_TAB)[keyof typeof ENUM_ACCOMMODATION_EDIT_TAB];
