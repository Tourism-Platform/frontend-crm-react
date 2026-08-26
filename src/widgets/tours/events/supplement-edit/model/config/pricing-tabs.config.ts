import { InvoicingIndividual, InvoicingPart } from "../../ui/pricing";
import {
	ENUM_SUPPLEMENT_PRICING_INVOICING,
	type ISupplementPricingTab
} from "../types";
import type { TSlotProps } from "../types/supplement-tabs.types";

export const PRICING_TABS_LIST: ISupplementPricingTab<TSlotProps>[] = [
	{
		label: "form.pricing.invoicing.tabs.individual",
		type: ENUM_SUPPLEMENT_PRICING_INVOICING.INDIVIDUAL,
		slot: InvoicingIndividual
	},
	{
		label: "form.pricing.invoicing.tabs.part_of_package",
		type: ENUM_SUPPLEMENT_PRICING_INVOICING.PART_OF_PACKAGE,
		slot: InvoicingPart
	}
];
