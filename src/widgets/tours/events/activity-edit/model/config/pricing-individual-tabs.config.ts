import { ENUM_ACTIVITY_PRICING_TYPE } from "@/entities/tour";

import type { IActivityIndividualPricingTab } from "../types";

export const PRICING_INDIVIDUAL_TABS_LIST: IActivityIndividualPricingTab[] = [
	{
		label: "form.pricing.pricing_type.tabs.flat_rate",
		type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE
	},
	{
		label: "form.pricing.pricing_type.tabs.per_person",
		type: ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON
	}
];
