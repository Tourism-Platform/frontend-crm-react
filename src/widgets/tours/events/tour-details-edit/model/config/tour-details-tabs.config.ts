import { Media } from "../../../ui";
import { GeneralInfo } from "../../ui";
import {
	ENUM_TOUR_DETAILS_EDIT_TAB,
	type ITourDetailsEditTabs
} from "../types";

export const TOUR_DETAILS_EDIT_TABS_LIST: ITourDetailsEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_TOUR_DETAILS_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.media",
		type: ENUM_TOUR_DETAILS_EDIT_TAB.MEDIA,
		slot: Media
	}
];
