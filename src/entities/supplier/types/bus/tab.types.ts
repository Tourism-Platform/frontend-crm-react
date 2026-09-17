export const ENUM_BUS_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	VEHICLES: "vehicles",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_BUS_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_BUS_PRODUCT_EDIT_TAB)[keyof typeof ENUM_BUS_PRODUCT_EDIT_TAB];
