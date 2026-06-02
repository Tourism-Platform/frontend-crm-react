import type React from "react";

import type { TTourAccommodationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD_TYPE,
	type ENUM_ACCOMMODATION_PRICE_ROW_FIELD_TYPE,
	type ENUM_ACCOMMODATION_PRICING_FIELD_TYPE,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	type ENUM_ACCOMMODATION_PRICING_INVOICING_TYPE,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	type ENUM_ACCOMMODATION_PRICING_TYPE_TYPE
} from "@/entities/tour";

export {
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE
};
export type {
	ENUM_ACCOMMODATION_PRICING_INVOICING_TYPE,
	ENUM_ACCOMMODATION_PRICING_TYPE_TYPE
};

export interface IAccommodationPricingTab<TProps> {
	label: TTourAccommodationEditPageKeys;
	type: ENUM_ACCOMMODATION_PRICING_INVOICING_TYPE;
	slot: React.ComponentType<TProps>;
}

export type TAccommodationPricingFormField = TFormField<
	TTourAccommodationEditPageKeys,
	| ENUM_ACCOMMODATION_PRICING_FIELD_TYPE
	| ENUM_ACCOMMODATION_PRICE_ROW_FIELD_TYPE
	| ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD_TYPE
>;

export interface IAccommodationIndividualPricingTab {
	label: TTourAccommodationEditPageKeys;
	type: ENUM_ACCOMMODATION_PRICING_TYPE_TYPE;
	priceDetailsList?: TAccommodationPricingFormField[];
}
