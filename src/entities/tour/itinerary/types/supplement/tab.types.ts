export const ENUM_SUPPLEMENT_EDIT_TAB = {
	ITEMS: "items",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_SUPPLEMENT_EDIT_TAB_TYPE =
	(typeof ENUM_SUPPLEMENT_EDIT_TAB)[keyof typeof ENUM_SUPPLEMENT_EDIT_TAB];
