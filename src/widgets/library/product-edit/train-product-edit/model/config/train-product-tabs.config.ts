import { type IQueryTab } from "@/shared/ui";

import {
	TrainProductGeneral,
	TrainProductImages,
	TrainProductVariants
} from "../../ui";
import {
	ENUM_TRAIN_PRODUCT_EDIT_TAB,
	type ITrainProductEditSlotContext
} from "../types";

type TTrainGeneralTabExtra = Pick<
	ITrainProductEditSlotContext,
	"supplierId" | "productId" | "isCreate" | "product"
>;

type TTrainVariantsTabExtra = Pick<
	ITrainProductEditSlotContext,
	"supplierId" | "productId" | "variants"
>;

type TTrainMediaTabExtra = Pick<
	ITrainProductEditSlotContext,
	"supplierId" | "productId"
> & { disabled: boolean };

type TTrainGeneralTab = IQueryTab<
	typeof ENUM_TRAIN_PRODUCT_EDIT_TAB.GENERAL,
	"train_product_edit_page",
	string,
	never,
	ITrainProductEditSlotContext,
	TTrainGeneralTabExtra
>;

type TTrainMediaTab = IQueryTab<
	typeof ENUM_TRAIN_PRODUCT_EDIT_TAB.MEDIA,
	"train_product_edit_page",
	string,
	never,
	ITrainProductEditSlotContext,
	TTrainMediaTabExtra
>;

type TTrainVariantsTab = IQueryTab<
	typeof ENUM_TRAIN_PRODUCT_EDIT_TAB.VARIANTS,
	"train_product_edit_page",
	string,
	never,
	ITrainProductEditSlotContext,
	TTrainVariantsTabExtra
>;

export const TRAIN_PRODUCT_EDIT_TABS_LIST: (
	| TTrainGeneralTab
	| TTrainMediaTab
	| TTrainVariantsTab
)[] = [
	{
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.GENERAL,
		label: "tabs.general",
		slot: TrainProductGeneral,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product
		})
	},
	{
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.MEDIA,
		label: "tabs.media",
		slot: TrainProductImages,
		getSlotProps: ({ supplierId, productId, isCreate }) => ({
			supplierId,
			productId,
			disabled: isCreate
		})
	},
	{
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: TrainProductVariants,
		getSlotProps: ({ supplierId, productId, variants }) => ({
			supplierId,
			productId,
			variants
		})
	}
];
