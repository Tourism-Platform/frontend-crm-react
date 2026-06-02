import { InvoicingIndividual, InvoicingPart } from "../../ui/pricing";
import {
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	type IAccommodationPricingTab
} from "../types";
import type { ISlotProps } from "../types/accommodation-tabs.types";

export const PRICING_TABS_LIST: IAccommodationPricingTab<ISlotProps>[] = [
	{
		label: "form.pricing.invoicing.tabs.individual",
		type: ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
		slot: InvoicingIndividual
	},
	{
		label: "form.pricing.invoicing.tabs.part_of_package",
		type: ENUM_ACCOMMODATION_PRICING_INVOICING.PART_OF_PACKAGE,
		slot: InvoicingPart
	}
];
