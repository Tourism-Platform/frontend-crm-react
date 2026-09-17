import type { TTourCommonEventsKeys } from "@/shared/config";

import {
	type ENUM_FLIGHT_PRICING_TYPE_TYPE,
	type ENUM_OVERRIDE_PRICING_ARM_TYPE,
	type TOverridePerUnitPricing,
	type TOverrideProductForm
} from "@/entities/tour";

export type TOverridePricingTabType =
	| ENUM_FLIGHT_PRICING_TYPE_TYPE
	| TOverridePerUnitPricing;

export interface IOverridePricingTab {
	label: TTourCommonEventsKeys;
	type: TOverridePricingTabType;
	priceDetailsList?: TOverrideProductForm[];
}

export interface IOverridePricingTabSelection {
	pricing_arm: ENUM_OVERRIDE_PRICING_ARM_TYPE;
	pricing_type?: ENUM_FLIGHT_PRICING_TYPE_TYPE;
}
