import type { TBusProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_BUS_PRODUCT_PRICING_FIELD_TYPE,
	ENUM_BUS_PRODUCT_PRICING_TYPE,
	type ENUM_BUS_PRODUCT_PRICING_TYPE_TYPE,
	type ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD_TYPE
} from "@/entities/supplier";

export { ENUM_BUS_PRODUCT_PRICING_TYPE };
export type { ENUM_BUS_PRODUCT_PRICING_TYPE_TYPE };

export type TBusProductPricingFormField = TFormField<
	TBusProductEditPageKeys,
	| ENUM_BUS_PRODUCT_PRICING_FIELD_TYPE
	| ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD_TYPE
>;

export interface IBusProductIndividualPricingTab {
	label: TBusProductEditPageKeys;
	type: ENUM_BUS_PRODUCT_PRICING_TYPE_TYPE;
	priceDetailsList?: TBusProductPricingFormField[];
}
