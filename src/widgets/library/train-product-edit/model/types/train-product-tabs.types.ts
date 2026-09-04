import type { ITrainProduct, ITrainVariant } from "@/entities/supplier";

export const ENUM_TRAIN_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	VARIANTS: "variants"
} as const;

export type ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_TRAIN_PRODUCT_EDIT_TAB)[keyof typeof ENUM_TRAIN_PRODUCT_EDIT_TAB];

export interface ITrainProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITrainProduct | null;
	variants: ITrainVariant[];
}
