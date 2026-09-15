import type { TTransferProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD_TYPE,
	type ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD_TYPE,
	type ENUM_TRANSFER_PRODUCT_PRICING_FIELD_TYPE,
	ENUM_TRANSFER_PRODUCT_PRICING_TYPE,
	type ENUM_TRANSFER_PRODUCT_PRICING_TYPE_TYPE
} from "@/entities/supplier";

export { ENUM_TRANSFER_PRODUCT_PRICING_TYPE };
export type { ENUM_TRANSFER_PRODUCT_PRICING_TYPE_TYPE };

export type TTransferProductPricingFormField = TFormField<
	TTransferProductEditPageKeys,
	| ENUM_TRANSFER_PRODUCT_PRICING_FIELD_TYPE
	| ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD_TYPE
	| ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD_TYPE
>;

export interface ITransferProductIndividualPricingTab {
	label: TTransferProductEditPageKeys;
	type: ENUM_TRANSFER_PRODUCT_PRICING_TYPE_TYPE;
	priceDetailsList?: TTransferProductPricingFormField[];
}
