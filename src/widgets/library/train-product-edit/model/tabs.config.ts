import type { TTrainProductEditPageKeys } from "@/shared/config";

import {
	ENUM_TRAIN_PRODUCT_EDIT_TAB,
	type ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE
} from "./types";

export interface ITrainProductEditTab {
	label: TTrainProductEditPageKeys;
	type: ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE;
}

export const TRAIN_PRODUCT_EDIT_TABS: ITrainProductEditTab[] = [
	{
		label: "tabs.general",
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.GENERAL
	},
	{
		label: "tabs.variants",
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.VARIANTS
	},
	{
		label: "tabs.images",
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.IMAGES
	}
];
