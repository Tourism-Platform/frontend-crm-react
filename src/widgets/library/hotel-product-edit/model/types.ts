import type { IHotelProduct } from "@/entities/supplier";

export const ENUM_HOTEL_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	VARIANTS: "variants",
	IMAGES: "images"
} as const;

export type ENUM_HOTEL_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_HOTEL_PRODUCT_EDIT_TAB)[keyof typeof ENUM_HOTEL_PRODUCT_EDIT_TAB];

export interface IHotelProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IHotelProduct | null;
}
