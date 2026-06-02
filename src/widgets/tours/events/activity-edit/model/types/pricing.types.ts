import type React from "react";

import type { TTourActivityEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_ACTIVITY_PRICING_INVOICING,
	type ENUM_ACTIVITY_PRICING_INVOICING_TYPE,
	ENUM_ACTIVITY_PRICING_TYPE,
	type ENUM_ACTIVITY_PRICING_TYPE_TYPE
} from "@/entities/tour";

export { ENUM_ACTIVITY_PRICING_INVOICING, ENUM_ACTIVITY_PRICING_TYPE };
export type {
	ENUM_ACTIVITY_PRICING_INVOICING_TYPE,
	ENUM_ACTIVITY_PRICING_TYPE_TYPE
};

export interface IActivityPricingTab<TProps> {
	label: TTourActivityEditPageKeys;
	type: ENUM_ACTIVITY_PRICING_INVOICING_TYPE;
	slot: React.ComponentType<TProps>;
}

export type TActivityPricingFormField = TFormField<
	TTourActivityEditPageKeys,
	string
>;

export interface IActivityIndividualPricingTab {
	label: TTourActivityEditPageKeys;
	type: ENUM_ACTIVITY_PRICING_TYPE_TYPE;
	priceDetailsList: TActivityPricingFormField[];
}
