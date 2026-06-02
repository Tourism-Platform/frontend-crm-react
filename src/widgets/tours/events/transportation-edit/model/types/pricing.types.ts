import type React from "react";

import type { TTourEventTransportationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD_TYPE,
	type ENUM_TRANSPORTATION_PRICE_ROW_FIELD_TYPE,
	type ENUM_TRANSPORTATION_PRICING_FIELD_TYPE,
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	type ENUM_TRANSPORTATION_PRICING_INVOICING_TYPE,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type ENUM_TRANSPORTATION_PRICING_TYPE_TYPE
} from "@/entities/tour";

export {
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE
};
export type {
	ENUM_TRANSPORTATION_PRICING_INVOICING_TYPE,
	ENUM_TRANSPORTATION_PRICING_TYPE_TYPE
};

export interface ITransportationPricingTab<TProps> {
	label: TTourEventTransportationEditPageKeys;
	type: ENUM_TRANSPORTATION_PRICING_INVOICING_TYPE;
	slot: React.ComponentType<TProps>;
}

export type TTransportationPricingFormField = TFormField<
	TTourEventTransportationEditPageKeys,
	| ENUM_TRANSPORTATION_PRICING_FIELD_TYPE
	| ENUM_TRANSPORTATION_PRICE_ROW_FIELD_TYPE
	| ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD_TYPE
>;

export interface ITransportationIndividualPricingTab {
	label: TTourEventTransportationEditPageKeys;
	type: ENUM_TRANSPORTATION_PRICING_TYPE_TYPE;
	priceDetailsList?: TTransportationPricingFormField[];
}
