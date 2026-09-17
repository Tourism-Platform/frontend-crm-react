import type { TTourCommonEventsKeys } from "@/shared/config";

import {
	ENUM_FLIGHT_PRICING_TYPE,
	type ENUM_FLIGHT_PRICING_TYPE_TYPE,
	ENUM_OVERRIDE_PRICING_ARM,
	type ENUM_OVERRIDE_PRICING_ARM_TYPE,
	type TOverridePerUnitPricing
} from "@/entities/tour";

import type {
	IOverridePricingTab,
	IOverridePricingTabSelection,
	TOverridePricingTabType
} from "../types";

import {
	FORM_OVERRIDE_FLAT_RATE_PRICE_DETAILS_LIST,
	FORM_OVERRIDE_PER_PERSON_PRICE_DETAILS_LIST
} from "./override-pricing.config";

const OVERRIDE_PER_UNIT_TAB_LABELS: Record<
	TOverridePerUnitPricing,
	TTourCommonEventsKeys
> = {
	per_room: "override_product.dialog.pricing.tabs.per_room",
	per_fare: "override_product.dialog.pricing.tabs.per_fare",
	per_vehicle: "override_product.dialog.pricing.tabs.per_vehicle",
	per_car: "override_product.dialog.pricing.tabs.per_car",
	per_car_category: "override_product.dialog.pricing.tabs.per_car_category",
	offerings: "override_product.dialog.pricing.tabs.offerings"
};

export const getOverridePricingTabsList = (
	perUnitArm: TOverridePerUnitPricing
): IOverridePricingTab[] => [
	{
		label: "override_product.dialog.pricing.tabs.flat_rate",
		type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
		priceDetailsList: FORM_OVERRIDE_FLAT_RATE_PRICE_DETAILS_LIST
	},
	{
		label: OVERRIDE_PER_UNIT_TAB_LABELS[perUnitArm],
		type: perUnitArm
	},
	{
		label: "override_product.dialog.pricing.tabs.per_person",
		type: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
		priceDetailsList: FORM_OVERRIDE_PER_PERSON_PRICE_DETAILS_LIST
	}
];

export const getOverridePricingTab = (
	arm: ENUM_OVERRIDE_PRICING_ARM_TYPE,
	pricingType: ENUM_FLIGHT_PRICING_TYPE_TYPE,
	perUnitArm: TOverridePerUnitPricing
): TOverridePricingTabType => {
	if (arm !== ENUM_OVERRIDE_PRICING_ARM.WHOLE) {
		return perUnitArm;
	}

	return pricingType === ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
		? ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
		: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE;
};

export const applyOverridePricingTab = (
	tab: string,
	perUnitArm: TOverridePerUnitPricing
): IOverridePricingTabSelection => {
	if (tab === ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE) {
		return {
			pricing_arm: ENUM_OVERRIDE_PRICING_ARM.WHOLE,
			pricing_type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE
		};
	}

	if (tab === ENUM_FLIGHT_PRICING_TYPE.PER_PERSON) {
		return {
			pricing_arm: ENUM_OVERRIDE_PRICING_ARM.WHOLE,
			pricing_type: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
		};
	}

	return { pricing_arm: perUnitArm };
};
