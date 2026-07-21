import { ENUM_GUIDE_PRICING_INVOICING } from "@/entities/tour";

import { InvoicingIndividual, InvoicingPart } from "../../ui/pricing";

export const PRICING_TABS_LIST = [
	{
		label: "form.pricing.invoicing.tabs.individual",
		type: ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
		slot: InvoicingIndividual
	},
	{
		label: "form.pricing.invoicing.tabs.part_of_package",
		type: ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE,
		slot: InvoicingPart
	}
] as const;

export type TGuidePricingTab = (typeof PRICING_TABS_LIST)[number];
