export const ENUM_ACTIVITY_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	VARIANTS: "variants"
} as const;

export type ENUM_ACTIVITY_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB)[keyof typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB];
