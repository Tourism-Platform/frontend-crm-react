export const ENUM_TRANSPORTATION_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing",
	CARS: "cars"
} as const;

export type ENUM_TRANSPORTATION_EDIT_TAB_TYPE =
	(typeof ENUM_TRANSPORTATION_EDIT_TAB)[keyof typeof ENUM_TRANSPORTATION_EDIT_TAB];
