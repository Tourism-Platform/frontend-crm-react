import type { TTrainProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD_TYPE,
	type ENUM_TRAIN_PRODUCT_PRICING_FIELD_TYPE,
	ENUM_TRAIN_PRODUCT_PRICING_TYPE,
	type ENUM_TRAIN_PRODUCT_PRICING_TYPE_TYPE
} from "@/entities/supplier";

export { ENUM_TRAIN_PRODUCT_PRICING_TYPE };
export type { ENUM_TRAIN_PRODUCT_PRICING_TYPE_TYPE };

export type TTrainProductPricingFormField = TFormField<
	TTrainProductEditPageKeys,
	| ENUM_TRAIN_PRODUCT_PRICING_FIELD_TYPE
	| ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD_TYPE
>;

export interface ITrainProductIndividualPricingTab {
	label: TTrainProductEditPageKeys;
	type: ENUM_TRAIN_PRODUCT_PRICING_TYPE_TYPE;
	priceDetailsList?: TTrainProductPricingFormField[];
}
