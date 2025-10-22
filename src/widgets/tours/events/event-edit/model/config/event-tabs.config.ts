import { Media, Pricing } from "../../../ui";
import { GeneralInfo } from "../../ui";
import { ENUM_EVENT_EDIT_TAB, type IEventEditTabs } from "../types";

export const EVENT_EDIT_TABS_LIST: IEventEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_EVENT_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.media",
		type: ENUM_EVENT_EDIT_TAB.MEDIA,
		slot: Media
	},
	{
		label: "tabs.pricing",
		type: ENUM_EVENT_EDIT_TAB.PRICING,
		slot: Pricing
	}
];
