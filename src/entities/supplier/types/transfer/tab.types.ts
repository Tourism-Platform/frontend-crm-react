export const ENUM_TRANSFER_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	CARS: "cars",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_TRANSFER_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB)[keyof typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB];
