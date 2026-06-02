import { InvoicingIndividual, InvoicingPart } from "../../ui";
import {
	ENUM_FLIGHT_PRICING_INVOICING,
	type IFlightPricingTab
} from "../types";
import type { ISlotProps } from "../types";

export const PRICING_TABS_LIST: IFlightPricingTab<ISlotProps>[] = [
	{
		label: "form.pricing.invoicing.tabs.individual",
		type: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
		slot: InvoicingIndividual
	},
	{
		label: "form.pricing.invoicing.tabs.part_of_package",
		type: ENUM_FLIGHT_PRICING_INVOICING.PART_OF_PACKAGE,
		slot: InvoicingPart
	}
];
