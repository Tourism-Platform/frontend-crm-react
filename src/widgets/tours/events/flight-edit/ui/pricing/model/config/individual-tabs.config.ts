import { ENUM_INDIVIDUAL_TABS, type IIndividualTabs } from "../types";

export const PRICING_INDIVIDUAL_TABS_LIST: IIndividualTabs[] = [
	{
		label: "pricing.pricing_type.tabs.flat_rate",
		type: ENUM_INDIVIDUAL_TABS.FLAT_RATE
	},
	{
		label: "pricing.pricing_type.tabs.per_person",
		type: ENUM_INDIVIDUAL_TABS.PER_PERSON
	}
];
