import { ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION } from "@/entities/tour";

import { Media } from "../../../ui";
import { GeneralInfo, Pricing } from "../../ui";
import { ENUM_FLIGHT_EDIT_TAB, type IFlightEditTabs } from "../types";

export const FLIGHT_EDIT_TABS_LIST: IFlightEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_FLIGHT_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL
	},
	{
		label: "tabs.media",
		type: ENUM_FLIGHT_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "flight_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_FLIGHT_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
