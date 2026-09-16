import type { THotelProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD_TYPE,
	ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD_TYPE,
	ENUM_HOTEL_PRODUCT_PRICING_FIELD_TYPE,
	ENUM_HOTEL_PRODUCT_PRICING_TYPE_TYPE
} from "@/entities/supplier";

export type THotelProductPricingFormField = TFormField<
	THotelProductEditPageKeys,
	| ENUM_HOTEL_PRODUCT_PRICING_FIELD_TYPE
	| ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD_TYPE
	| ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD_TYPE
>;

export interface IHotelProductIndividualPricingTab {
	label: THotelProductEditPageKeys;
	type: ENUM_HOTEL_PRODUCT_PRICING_TYPE_TYPE;
	priceDetailsList?: THotelProductPricingFormField[];
}
