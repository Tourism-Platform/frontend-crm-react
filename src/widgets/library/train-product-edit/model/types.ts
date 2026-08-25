export const ENUM_TRAIN_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	HOPS: "hops",
	VARIANTS: "variants",
	IMAGES: "images"
} as const;

export type ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_TRAIN_PRODUCT_EDIT_TAB)[keyof typeof ENUM_TRAIN_PRODUCT_EDIT_TAB];

export interface ITrainProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: import("@/entities/supplier").ITrainProduct | null;
}
