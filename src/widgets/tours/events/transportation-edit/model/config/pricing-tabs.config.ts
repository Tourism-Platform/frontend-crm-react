import { InvoicingIndividual, InvoicingPart } from "../../ui/pricing";
import {
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	type ITransportationPricingTab
} from "../types";
import type { ISlotProps } from "../types/transportation-tabs.types";

export const PRICING_TABS_LIST: ITransportationPricingTab<ISlotProps>[] = [
	{
		label: "form.pricing.invoicing.tabs.individual",
		type: ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL,
		slot: InvoicingIndividual
	},
	{
		label: "form.pricing.invoicing.tabs.part_of_package",
		type: ENUM_TRANSPORTATION_PRICING_INVOICING.PART_OF_PACKAGE,
		slot: InvoicingPart
	}
];
