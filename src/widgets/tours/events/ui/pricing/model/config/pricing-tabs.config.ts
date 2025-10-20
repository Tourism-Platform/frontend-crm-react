import {
	type IInvoicingIndividualProps,
	type IInvoicingPartProps,
	InvoicingIndividual,
	InvoicingPart
} from "../../ui";
import { ENUM_PRICING_TAB, type IPricingTab } from "../types";

export const PRICING_TABS_LIST = [
	{
		label: "pricing.invoicing.tabs.individual",
		type: ENUM_PRICING_TAB.INDIVIDUAL,
		slot: InvoicingIndividual
	} satisfies IPricingTab<IInvoicingIndividualProps>,

	{
		label: "pricing.invoicing.tabs.part_of_package",
		type: ENUM_PRICING_TAB.PART,
		slot: InvoicingPart
	} satisfies IPricingTab<IInvoicingPartProps>
] as const;
