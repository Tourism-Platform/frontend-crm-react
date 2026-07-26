export const ENUM_ACTIVITY_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_ACTIVITY_EDIT_TAB_TYPE =
	(typeof ENUM_ACTIVITY_EDIT_TAB)[keyof typeof ENUM_ACTIVITY_EDIT_TAB];
