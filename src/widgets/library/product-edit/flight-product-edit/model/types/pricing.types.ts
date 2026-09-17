import type { TFlightProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD_TYPE,
	type ENUM_FLIGHT_PRODUCT_PRICING_FIELD_TYPE,
	ENUM_FLIGHT_PRODUCT_PRICING_TYPE,
	type ENUM_FLIGHT_PRODUCT_PRICING_TYPE_TYPE
} from "@/entities/supplier";

export { ENUM_FLIGHT_PRODUCT_PRICING_TYPE };
export type { ENUM_FLIGHT_PRODUCT_PRICING_TYPE_TYPE };

export type TFlightProductPricingFormField = TFormField<
	TFlightProductEditPageKeys,
	| ENUM_FLIGHT_PRODUCT_PRICING_FIELD_TYPE
	| ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD_TYPE
>;

export interface IFlightProductIndividualPricingTab {
	label: TFlightProductEditPageKeys;
	type: ENUM_FLIGHT_PRODUCT_PRICING_TYPE_TYPE;
	priceDetailsList?: TFlightProductPricingFormField[];
}
