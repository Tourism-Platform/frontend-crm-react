import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_HOTEL_PRODUCT_EDIT_TAB,
	type ENUM_HOTEL_PRODUCT_EDIT_TAB_TYPE,
	type THotelProductEditSchema
} from "@/entities/supplier";

import { GeneralInfo } from "../../ui/general-info";
import { HotelProductImages } from "../../ui/images";
import { Pricing } from "../../ui/pricing";
import { RoomsInfo } from "../../ui/rooms";
import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	type IHotelProductEditSlotContext,
	type TSlotProps
} from "../types";

type THotelProductTabExtra = Omit<
	TSlotProps,
	"form" | "onSubmit" | "isLoading"
>;

export const HOTEL_PRODUCT_EDIT_TABS_LIST: IQueryTab<
	ENUM_HOTEL_PRODUCT_EDIT_TAB_TYPE,
	"hotel_product_edit_page",
	ENUM_FORM_SECTION_TYPE,
	THotelProductEditSchema,
	IHotelProductEditSlotContext,
	THotelProductTabExtra
>[] = [
	{
		label: "tabs.general",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product,
			disabled: false
		})
	},
	{
		label: "tabs.rooms",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.ROOMS,
		slot: RoomsInfo,
		section: ENUM_FORM_SECTION.ROOMS,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product,
			disabled: isCreate
		})
	},
	{
		label: "tabs.media",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.MEDIA,
		slot: HotelProductImages,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product,
			disabled: isCreate
		})
	},
	{
		label: "tabs.pricing",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product,
			disabled: isCreate
		})
	}
];
