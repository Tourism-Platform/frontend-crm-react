import type { THotelProductEditPageKeys } from "@/shared/config";

import type { ENUM_HOTEL_PRODUCT_EDIT_TAB_TYPE } from "./types";
import { ENUM_HOTEL_PRODUCT_EDIT_TAB } from "./types";

export interface IHotelProductEditTab {
	label: THotelProductEditPageKeys;
	type: ENUM_HOTEL_PRODUCT_EDIT_TAB_TYPE;
}

export const HOTEL_PRODUCT_EDIT_TABS: IHotelProductEditTab[] = [
	{
		label: "tabs.general",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.GENERAL
	},
	{
		label: "tabs.details",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.DETAILS
	},
	{
		label: "tabs.variants",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.VARIANTS
	},
	{
		label: "tabs.images",
		type: ENUM_HOTEL_PRODUCT_EDIT_TAB.IMAGES
	}
];
