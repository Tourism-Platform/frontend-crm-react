import { type IQueryTab } from "@/shared/ui";

import {
	FlightProductGeneral,
	FlightProductImages,
	FlightProductVariants
} from "../../ui";
import {
	ENUM_FLIGHT_PRODUCT_EDIT_TAB,
	type IFlightProductEditSlotContext
} from "../types";

type TFlightGeneralTabExtra = Pick<
	IFlightProductEditSlotContext,
	"supplierId" | "productId" | "isCreate" | "product"
>;

type TFlightVariantsTabExtra = Pick<
	IFlightProductEditSlotContext,
	"supplierId" | "productId" | "variants"
>;

type TFlightMediaTabExtra = Pick<
	IFlightProductEditSlotContext,
	"supplierId" | "productId"
> & { disabled: boolean };

type TFlightGeneralTab = IQueryTab<
	typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB.GENERAL,
	"flight_product_edit_page",
	string,
	never,
	IFlightProductEditSlotContext,
	TFlightGeneralTabExtra
>;

type TFlightMediaTab = IQueryTab<
	typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB.MEDIA,
	"flight_product_edit_page",
	string,
	never,
	IFlightProductEditSlotContext,
	TFlightMediaTabExtra
>;

type TFlightVariantsTab = IQueryTab<
	typeof ENUM_FLIGHT_PRODUCT_EDIT_TAB.VARIANTS,
	"flight_product_edit_page",
	string,
	never,
	IFlightProductEditSlotContext,
	TFlightVariantsTabExtra
>;

export const FLIGHT_PRODUCT_EDIT_TABS_LIST: (
	| TFlightGeneralTab
	| TFlightMediaTab
	| TFlightVariantsTab
)[] = [
	{
		type: ENUM_FLIGHT_PRODUCT_EDIT_TAB.GENERAL,
		label: "tabs.general",
		slot: FlightProductGeneral,
		getSlotProps: ({ supplierId, productId, isCreate, product }) => ({
			supplierId,
			productId,
			isCreate,
			product
		})
	},
	{
		type: ENUM_FLIGHT_PRODUCT_EDIT_TAB.MEDIA,
		label: "tabs.media",
		slot: FlightProductImages,
		getSlotProps: ({ supplierId, productId, isCreate }) => ({
			supplierId,
			productId,
			disabled: isCreate
		})
	},
	{
		type: ENUM_FLIGHT_PRODUCT_EDIT_TAB.VARIANTS,
		label: "tabs.variants",
		slot: FlightProductVariants,
		getSlotProps: ({ supplierId, productId, variants }) => ({
			supplierId,
			productId,
			variants
		})
	}
];
