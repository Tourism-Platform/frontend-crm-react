import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_ACTIVITY_PRODUCT_EDIT_TAB,
	type ENUM_ACTIVITY_PRODUCT_EDIT_TAB_TYPE,
	type TActivityProductEditSchema
} from "@/entities/supplier";

import { GeneralInfo } from "../../ui/general-info";
import { ActivityProductImages } from "../../ui/images";
import { VariantsInfo } from "../../ui/variants";
import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	type IActivityProductEditSlotContext,
	type TSlotProps
} from "../types";

type TActivityProductTabExtra = Omit<
	TSlotProps,
	"form" | "onSubmit" | "isLoading"
>;

export const ACTIVITY_PRODUCT_EDIT_TABS_LIST: IQueryTab<
	ENUM_ACTIVITY_PRODUCT_EDIT_TAB_TYPE,
	"activity_product_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TActivityProductEditSchema,
	IActivityProductEditSlotContext,
	TActivityProductTabExtra
>[] = [
	{
		label: "tabs.general",
		type: ENUM_ACTIVITY_PRODUCT_EDIT_TAB.GENERAL,
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
		label: "tabs.media",
		type: ENUM_ACTIVITY_PRODUCT_EDIT_TAB.MEDIA,
		slot: ActivityProductImages,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product,
			disabled: isCreate
		})
	},
	{
		label: "tabs.variants",
		type: ENUM_ACTIVITY_PRODUCT_EDIT_TAB.VARIANTS,
		slot: VariantsInfo,
		section: ENUM_FORM_SECTION.VARIANTS,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product,
			disabled: isCreate
		})
	}
];
