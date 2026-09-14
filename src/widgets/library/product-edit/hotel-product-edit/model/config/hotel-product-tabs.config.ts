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
	"supplierId" | "productId" | "product" | "variants"
>;

type THotelMediaTabExtra = Pick<
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

type THotelMediaTab = IQueryTab<
	typeof ENUM_HOTEL_PRODUCT_EDIT_TAB.MEDIA,
	"hotel_product_edit_page",
	string,
	never,
	IHotelProductEditSlotContext,
	THotelMediaTabExtra
>;

type THotelVariantsTab = IQueryTab<
	typeof ENUM_HOTEL_PRODUCT_EDIT_TAB.VARIANTS,
	"hotel_product_edit_page",
	string,
	never,
	IHotelProductEditSlotContext,
	THotelVariantsTabExtra
>;

export const HOTEL_PRODUCT_EDIT_TABS_LIST: (
	| THotelGeneralTab
	| THotelMediaTab
	| THotelVariantsTab
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
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.MEDIA,
		label: "tabs.media",
		slot: HotelProductImages,
		getSlotProps: ({ supplierId, productId, variants, isCreate }) => ({
			supplierId,
			productId,
			variants,
			disabled: isCreate
		})
	},
	{
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: HotelProductVariants,
		getSlotProps: ({ supplierId, productId, product, variants }) => ({
			supplierId,
			productId,
			product,
			variants
		})
	}
];
