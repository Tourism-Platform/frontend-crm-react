import { type IQueryTab } from "@/shared/ui";

import {
	TransferProductGeneral,
	TransferProductImages,
	TransferProductVariants
} from "../../ui";
import {
	ENUM_TRANSFER_PRODUCT_EDIT_TAB,
	type ITransferProductEditSlotContext
} from "../types";

type TTransferGeneralTabExtra = Pick<
	ITransferProductEditSlotContext,
	"supplierId" | "productId" | "isCreate" | "product"
>;

type TTransferVariantsTabExtra = Pick<
	ITransferProductEditSlotContext,
	"supplierId" | "productId" | "product" | "variants"
>;

type TTransferMediaTabExtra = Pick<
	ITransferProductEditSlotContext,
	"supplierId" | "productId"
> & { disabled: boolean };

type TTransferGeneralTab = IQueryTab<
	typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB.GENERAL,
	"transfer_product_edit_page",
	string,
	never,
	ITransferProductEditSlotContext,
	TTransferGeneralTabExtra
>;

type TTransferMediaTab = IQueryTab<
	typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB.MEDIA,
	"transfer_product_edit_page",
	string,
	never,
	ITransferProductEditSlotContext,
	TTransferMediaTabExtra
>;

type TTransferVariantsTab = IQueryTab<
	typeof ENUM_TRANSFER_PRODUCT_EDIT_TAB.VARIANTS,
	"transfer_product_edit_page",
	string,
	never,
	ITransferProductEditSlotContext,
	TTransferVariantsTabExtra
>;

export const TRANSFER_PRODUCT_EDIT_TABS_LIST: (
	| TTransferGeneralTab
	| TTransferMediaTab
	| TTransferVariantsTab
)[] = [
	{
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.GENERAL,
		label: "tabs.general",
		slot: TransferProductGeneral,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product
		})
	},
	{
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.MEDIA,
		label: "tabs.media",
		slot: TransferProductImages,
		getSlotProps: ({ supplierId, productId, isCreate }) => ({
			supplierId,
			productId,
			disabled: isCreate
		})
	},
	{
		type: ENUM_TRANSFER_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: TransferProductVariants,
		getSlotProps: ({ supplierId, productId, product, variants }) => ({
			supplierId,
			productId,
			product,
			variants
		})
	}
];
