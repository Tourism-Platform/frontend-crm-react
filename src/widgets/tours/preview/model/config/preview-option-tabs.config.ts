import { FullItinerary, Pricing } from "../../ui/option";
import { ENUM_PREVIEW_OPTION_TAB, type IPreviewOptionTab } from "../types";

export const PREVIEW_OPTION_TABS_LIST: IPreviewOptionTab[] = [
	{
		type: ENUM_PREVIEW_OPTION_TAB.FULL_ITINERARY,
		label: "tabs.full_itinerary",
		slot: FullItinerary
	},
	{
		type: ENUM_PREVIEW_OPTION_TAB.PRICING,
		label: "tabs.pricing",
		slot: Pricing
	}
];
