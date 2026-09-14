import { type IQueryTab } from "@/shared/ui";

import {
	ActivityProductGeneral,
	ActivityProductImages,
	ActivityProductVariants
} from "../../ui";
import {
	ENUM_ACTIVITY_PRODUCT_EDIT_TAB,
	type IActivityProductEditSlotContext
} from "../types";

type TActivityGeneralTabExtra = Pick<
	IActivityProductEditSlotContext,
	"supplierId" | "productId" | "isCreate" | "product"
>;

type TActivityVariantsTabExtra = Pick<
	IActivityProductEditSlotContext,
	"supplierId" | "productId" | "variants"
> & { disabled: boolean };

type TActivityMediaTabExtra = Pick<
	IActivityProductEditSlotContext,
	"supplierId" | "productId"
> & { disabled: boolean };

type TActivityGeneralTab = IQueryTab<
	typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB.GENERAL,
	"activity_product_edit_page",
	string,
	never,
	IActivityProductEditSlotContext,
	TActivityGeneralTabExtra
>;

type TActivityMediaTab = IQueryTab<
	typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB.MEDIA,
	"activity_product_edit_page",
	string,
	never,
	IActivityProductEditSlotContext,
	TActivityMediaTabExtra
>;

type TActivityVariantsTab = IQueryTab<
	typeof ENUM_ACTIVITY_PRODUCT_EDIT_TAB.VARIANTS,
	"activity_product_edit_page",
	string,
	never,
	IActivityProductEditSlotContext,
	TActivityVariantsTabExtra
>;

export const ACTIVITY_PRODUCT_EDIT_TABS_LIST: (
	| TActivityGeneralTab
	| TActivityMediaTab
	| TActivityVariantsTab
)[] = [
	{
		type: ENUM_ACTIVITY_PRODUCT_EDIT_TAB.GENERAL,
		label: "tabs.general",
		slot: ActivityProductGeneral,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product
		})
	},
	{
		type: ENUM_ACTIVITY_PRODUCT_EDIT_TAB.MEDIA,
		label: "tabs.media",
		slot: ActivityProductImages,
		getSlotProps: ({ supplierId, productId, isCreate }) => ({
			supplierId,
			productId,
			disabled: isCreate
		})
	},
	{
		type: ENUM_ACTIVITY_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: ActivityProductVariants,
		getSlotProps: ({ supplierId, productId, variants, isCreate }) => ({
			supplierId,
			productId,
			variants,
			disabled: isCreate
		})
	}
];
