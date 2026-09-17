import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_BUS_PRODUCT_EDIT_TAB,
	type ENUM_BUS_PRODUCT_EDIT_TAB_TYPE,
	type TBusProductEditSchema
} from "@/entities/supplier";

import { GeneralInfo } from "../../ui/general-info";
import { BusProductImages } from "../../ui/images";
import { Pricing } from "../../ui/pricing";
import { VehiclesInfo } from "../../ui/vehicles";
import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	type IBusProductEditSlotContext,
	type TSlotProps
} from "../types";

type TBusProductTabExtra = Omit<TSlotProps, "form" | "onSubmit" | "isLoading">;

export const BUS_PRODUCT_EDIT_TABS_LIST: IQueryTab<
	ENUM_BUS_PRODUCT_EDIT_TAB_TYPE,
	"bus_product_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TBusProductEditSchema,
	IBusProductEditSlotContext,
	TBusProductTabExtra
>[] = [
	{
		label: "tabs.general",
		type: ENUM_BUS_PRODUCT_EDIT_TAB.GENERAL,
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
		label: "tabs.vehicles",
		type: ENUM_BUS_PRODUCT_EDIT_TAB.VEHICLES,
		slot: VehiclesInfo,
		section: ENUM_FORM_SECTION.VEHICLES,
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
		type: ENUM_BUS_PRODUCT_EDIT_TAB.MEDIA,
		slot: BusProductImages,
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
		type: ENUM_BUS_PRODUCT_EDIT_TAB.PRICING,
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
