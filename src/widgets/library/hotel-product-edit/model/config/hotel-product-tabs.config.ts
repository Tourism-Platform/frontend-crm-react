import { type IQueryTab } from "@/shared/ui";

import {
	HotelProductGeneral,
	HotelProductImages,
	HotelProductVariants
} from "../../ui";
import {
	ENUM_HOTEL_PRODUCT_EDIT_TAB,
	type IHotelProductEditSlotContext
} from "../types";

type THotelGeneralTabExtra = Pick<
	IHotelProductEditSlotContext,
	"supplierId" | "productId" | "isCreate" | "product"
>;

type THotelVariantsTabExtra = Pick<
	IHotelProductEditSlotContext,
	"supplierId" | "productId" | "variants"
>;

type THotelImagesTabExtra = Pick<
	IHotelProductEditSlotContext,
	"supplierId" | "productId" | "variants"
> & { disabled: boolean };

type THotelGeneralTab = IQueryTab<
	typeof ENUM_HOTEL_PRODUCT_EDIT_TAB.GENERAL,
	"hotel_product_edit_page",
	string,
	never,
	IHotelProductEditSlotContext,
	THotelGeneralTabExtra
>;

type THotelVariantsTab = IQueryTab<
	typeof ENUM_HOTEL_PRODUCT_EDIT_TAB.VARIANTS,
	"hotel_product_edit_page",
	string,
	never,
	IHotelProductEditSlotContext,
	THotelVariantsTabExtra
>;

type THotelImagesTab = IQueryTab<
	typeof ENUM_HOTEL_PRODUCT_EDIT_TAB.IMAGES,
	"hotel_product_edit_page",
	string,
	never,
	IHotelProductEditSlotContext,
	THotelImagesTabExtra
>;

export const HOTEL_PRODUCT_EDIT_TABS_LIST: (
	| THotelGeneralTab
	| THotelVariantsTab
	| THotelImagesTab
)[] = [
	{
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.GENERAL,
		label: "tabs.general",
		slot: HotelProductGeneral,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product
		})
	},
	{
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: HotelProductVariants,
		getSlotProps: ({ supplierId, productId, variants }) => ({
			supplierId,
			productId,
			variants
		})
	},
	{
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.IMAGES,
		label: "tabs.images",
		slot: HotelProductImages,
		getSlotProps: ({ supplierId, productId, variants, isCreate }) => ({
			supplierId,
			productId,
			variants,
			disabled: isCreate
		})
	}
];
