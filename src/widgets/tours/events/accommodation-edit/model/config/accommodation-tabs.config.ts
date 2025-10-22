import { Media, Pricing } from "../../../ui";
import { GeneralInfo, Rooms } from "../../ui";
import {
	ENUM_ACCOMMODATION_EDIT_TAB,
	type IAccommodationEditTabs
} from "../types";

export const ACCOMMODATION_EDIT_TABS_LIST: IAccommodationEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_ACCOMMODATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.rooms",
		type: ENUM_ACCOMMODATION_EDIT_TAB.ROOMS,
		slot: Rooms
	},
	{
		label: "tabs.media",
		type: ENUM_ACCOMMODATION_EDIT_TAB.MEDIA,
		slot: Media
	},
	{
		label: "tabs.pricing",
		type: ENUM_ACCOMMODATION_EDIT_TAB.PRICING,
		slot: Pricing
	}
];
