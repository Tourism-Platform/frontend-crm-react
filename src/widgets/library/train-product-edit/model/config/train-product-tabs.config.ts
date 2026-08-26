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

type TTrainImagesTabExtra = Pick<
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

type TTrainVariantsTab = IQueryTab<
	typeof ENUM_TRAIN_PRODUCT_EDIT_TAB.VARIANTS,
	"train_product_edit_page",
	string,
	never,
	ITrainProductEditSlotContext,
	TTrainVariantsTabExtra
>;

type TTrainImagesTab = IQueryTab<
	typeof ENUM_TRAIN_PRODUCT_EDIT_TAB.IMAGES,
	"train_product_edit_page",
	string,
	never,
	ITrainProductEditSlotContext,
	TTrainImagesTabExtra
>;

export const TRAIN_PRODUCT_EDIT_TABS_LIST: (
	| TTrainGeneralTab
	| TTrainVariantsTab
	| TTrainImagesTab
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
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: TrainProductVariants,
		getSlotProps: ({ supplierId, productId, variants }) => ({
			supplierId,
			productId,
			variants
		})
	},
	{
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.IMAGES,
		label: "tabs.images",
		slot: TrainProductImages,
		getSlotProps: ({ supplierId, productId, isCreate }) => ({
			supplierId,
			productId,
			disabled: isCreate
		})
	}
];
