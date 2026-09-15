import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_TRANSFER_PRODUCT_EDIT_TAB,
	type ENUM_TRANSFER_PRODUCT_EDIT_TAB_TYPE,
	type TTransferProductEditSchema
} from "@/entities/supplier";

import { CarsInfo } from "../../ui/cars";
import { GeneralInfo } from "../../ui/general-info";
import { TransferProductImages } from "../../ui/images";
import { Pricing } from "../../ui/pricing";
import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	type ITransferProductEditSlotContext,
	type TSlotProps
} from "../types";

type TTransferProductTabExtra = Omit<
	TSlotProps,
	"form" | "onSubmit" | "isLoading"
>;

export const TRANSFER_PRODUCT_EDIT_TABS_LIST: IQueryTab<
	ENUM_TRANSFER_PRODUCT_EDIT_TAB_TYPE,
	"transfer_product_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TTransferProductEditSchema,
	ITransferProductEditSlotContext,
	TTransferProductTabExtra
>[] = [
	{
		label: "tabs.general",
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.GENERAL,
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
		label: "tabs.cars",
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.CARS,
		slot: CarsInfo,
		section: ENUM_FORM_SECTION.CARS,
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
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.MEDIA,
		slot: TransferProductImages,
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
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.PRICING,
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
