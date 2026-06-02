import { Media } from "../../../ui";
import { GeneralInfo, Pricing } from "../../ui";
import {
	ENUM_ACTIVITY_EDIT_TAB,
	ENUM_FORM_SECTION,
	type IActivityEditTabs
} from "../types";

export const EVENT_EDIT_TABS_LIST: IActivityEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_ACTIVITY_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL
	},
	{
		label: "tabs.media",
		type: ENUM_ACTIVITY_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "activity_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_ACTIVITY_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
