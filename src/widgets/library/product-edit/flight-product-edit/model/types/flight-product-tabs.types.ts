import type { IFlightProduct, IFlightVariant } from "@/entities/supplier";

export const ENUM_FLIGHT_PRODUCT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	VARIANTS: "variants"
} as const;

export type ENUM_FLIGHT_PRODUCT_EDIT_TAB_TYPE =
	(typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB)[keyof typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB];

export interface IFlightProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IFlightProduct | null;
	variants: IFlightVariant[];
}
