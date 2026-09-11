import type { ITransferProduct, ITransferVariant } from "@/entities/supplier";

export const ENUM_TRANSFER_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	VARIANTS: "variants"
} as const;

export type ENUM_TRANSFER_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB)[keyof typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB];

export interface ITransferProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITransferProduct | null;
	variants: ITransferVariant[];
}
