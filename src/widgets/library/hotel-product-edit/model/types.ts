export const ENUM_HOTEL_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	DETAILS: "details",
	VARIANTS: "variants",
	IMAGES: "images"
} as const;

export type ENUM_HOTEL_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_EDIT_TAB)[keyof typeof ENUM_HOTEL_PRODUCT_EDIT_TAB];

export interface IHotelProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: import("@/entities/supplier").IHotelProduct | null;
}
