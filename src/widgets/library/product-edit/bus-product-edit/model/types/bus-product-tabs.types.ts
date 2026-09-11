import type { IBusProduct, IBusVariant } from "@/entities/supplier";

export const ENUM_BUS_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	VARIANTS: "variants"
} as const;

export type ENUM_BUS_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_BUS_PRODUCT_EDIT_TAB)[keyof typeof ENUM_BUS_PRODUCT_EDIT_TAB];

export interface IBusProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IBusProduct | null;
	variants: IBusVariant[];
}
