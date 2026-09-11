import type { IActivityProduct, IActivityVariant } from "@/entities/supplier";

export const ENUM_ACTIVITY_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	VARIANTS: "variants"
} as const;

export type ENUM_ACTIVITY_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB)[keyof typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB];

export interface IActivityProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IActivityProduct | null;
	variants: IActivityVariant[];
}
