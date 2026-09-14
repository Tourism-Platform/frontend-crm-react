import { type IQueryTab } from "@/shared/ui";

import {
	BusProductGeneral,
	BusProductImages,
	BusProductVariants
} from "../../ui";
import {
	ENUM_BUS_PRODUCT_EDIT_TAB,
	type IBusProductEditSlotContext
} from "../types";

type TBusGeneralTabExtra = Pick<
	IBusProductEditSlotContext,
	"supplierId" | "productId" | "isCreate" | "product"
>;

type TBusVariantsTabExtra = Pick<
	IBusProductEditSlotContext,
	"supplierId" | "productId" | "product" | "variants"
> & { disabled: boolean };

type TBusMediaTabExtra = Pick<
	IBusProductEditSlotContext,
	"supplierId" | "productId"
> & { disabled: boolean };

type TBusGeneralTab = IQueryTab<
	typeof ENUM_BUS_PRODUCT_EDIT_TAB.GENERAL,
	"bus_product_edit_page",
	string,
	never,
	IBusProductEditSlotContext,
	TBusGeneralTabExtra
>;

type TBusMediaTab = IQueryTab<
	typeof ENUM_BUS_PRODUCT_EDIT_TAB.MEDIA,
	"bus_product_edit_page",
	string,
	never,
	IBusProductEditSlotContext,
	TBusMediaTabExtra
>;

type TBusVariantsTab = IQueryTab<
	typeof ENUM_BUS_PRODUCT_EDIT_TAB.VARIANTS,
	"bus_product_edit_page",
	string,
	never,
	IBusProductEditSlotContext,
	TBusVariantsTabExtra
>;

export const BUS_PRODUCT_EDIT_TABS_LIST: (
	| TBusGeneralTab
	| TBusMediaTab
	| TBusVariantsTab
)[] = [
	{
		type: ENUM_BUS_PRODUCT_EDIT_TAB.GENERAL,
		label: "tabs.general",
		slot: BusProductGeneral,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product
		})
	},
	{
		type: ENUM_BUS_PRODUCT_EDIT_TAB.MEDIA,
		label: "tabs.media",
		slot: BusProductImages,
		getSlotProps: ({ supplierId, productId, isCreate }) => ({
			supplierId,
			productId,
			disabled: isCreate
		})
	},
	{
		type: ENUM_BUS_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: BusProductVariants,
		getSlotProps: ({
			supplierId,
			productId,
			product,
			variants,
			isCreate
		}) => ({
			supplierId,
			productId,
			product,
			variants,
			disabled: isCreate
		})
	}
];
