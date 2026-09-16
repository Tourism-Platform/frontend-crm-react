export const ENUM_TRAIN_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	FARES: "fares",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_TRAIN_PRODUCT_EDIT_TAB)[keyof typeof ENUM_TRAIN_PRODUCT_EDIT_TAB];
