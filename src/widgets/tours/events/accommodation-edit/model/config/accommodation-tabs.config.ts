import { Media } from "../../../ui";
import { GeneralInfo, Pricing, RoomsInfo } from "../../ui";
import {
	ENUM_ACCOMMODATION_EDIT_TAB,
	ENUM_FORM_SECTION,
	type IAccommodationEditTabs
} from "../types";

export const ACCOMMODATION_EDIT_TABS_LIST: IAccommodationEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_ACCOMMODATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL
	},
	{
		label: "tabs.rooms",
		type: ENUM_ACCOMMODATION_EDIT_TAB.ROOMS,
		slot: RoomsInfo,
		section: ENUM_FORM_SECTION.ROOMS
	},
	{
		label: "tabs.media",
		type: ENUM_ACCOMMODATION_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "accommodation_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_ACCOMMODATION_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
