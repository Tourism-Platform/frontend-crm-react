import {
	ENUM_GUIDE_PRICING_TYPE,
	type IGuideIndividualPricingTab
} from "../types";

export { ENUM_GUIDE_PRICING_TYPE };

export const PRICING_INDIVIDUAL_TABS_LIST: IGuideIndividualPricingTab[] = [
	{
		label: "form.pricing.pricing_type.tabs.per_guide",
		type: ENUM_GUIDE_PRICING_TYPE.PER_GUIDE
	}
];
