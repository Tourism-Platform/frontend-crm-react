import { InvoicingIndividual, InvoicingPart } from "../../ui/pricing";
import {
	ENUM_ACTIVITY_PRICING_INVOICING,
	type IActivityPricingTab
} from "../types";
import type { TSlotProps } from "../types/activity-tabs.types";

export const PRICING_TABS_LIST: IActivityPricingTab<TSlotProps>[] = [
	{
		label: "form.pricing.invoicing.tabs.individual",
		type: ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
		slot: InvoicingIndividual
	},
	{
		label: "form.pricing.invoicing.tabs.part_of_package",
		type: ENUM_ACTIVITY_PRICING_INVOICING.PART_OF_PACKAGE,
		slot: InvoicingPart
	}
];
