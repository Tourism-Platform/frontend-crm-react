import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_TRAIN_PRODUCT_EDIT_TAB,
	type ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE,
	type TTrainProductEditSchema
} from "@/entities/supplier";

import { FaresInfo } from "../../ui/fares";
import { GeneralInfo } from "../../ui/general-info";
import { TrainProductImages } from "../../ui/images";
import { Pricing } from "../../ui/pricing";
import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	type ITrainProductEditSlotContext,
	type TSlotProps
} from "../types";

type TTrainProductTabExtra = Omit<
	TSlotProps,
	"form" | "onSubmit" | "isLoading"
>;

export const TRAIN_PRODUCT_EDIT_TABS_LIST: IQueryTab<
	ENUM_TRAIN_PRODUCT_EDIT_TAB_TYPE,
	"train_product_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TTrainProductEditSchema,
	ITrainProductEditSlotContext,
	TTrainProductTabExtra
>[] = [
	{
		label: "tabs.general",
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.GENERAL,
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
		label: "tabs.fares",
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.FARES,
		slot: FaresInfo,
		section: ENUM_FORM_SECTION.FARES,
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
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.MEDIA,
		slot: TrainProductImages,
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
		type: ENUM_TRAIN_PRODUCT_EDIT_TAB.PRICING,
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
