import { GeneralInfo, Media, Pricing } from "../../ui";
import { ENUM_FLIGHT_EDIT_TAB, type IFlightEditTabs } from "../types";

export const FLIGHT_EDIT_TABS_LIST: IFlightEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_FLIGHT_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.media",
		type: ENUM_FLIGHT_EDIT_TAB.MEDIA,
		slot: Media
	},
	{
		label: "tabs.pricing",
		type: ENUM_FLIGHT_EDIT_TAB.PRICING,
		slot: Pricing
	}
];
