import { Media, Pricing } from "../../../ui";
import { CarsInfo, GeneralInfo } from "../../ui";
import {
	ENUM_FORM_SECTION,
	ENUM_TRANSPORTATION_EDIT_TAB,
	type ITransportationEditTabs
} from "../types";

export const TRANSPORTATION_EDIT_TABS_LIST: ITransportationEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_TRANSPORTATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL
	},
	{
		label: "tabs.cars",
		type: ENUM_TRANSPORTATION_EDIT_TAB.CARS,
		slot: CarsInfo,
		section: ENUM_FORM_SECTION.CARS
	},
	{
		label: "tabs.media",
		type: ENUM_TRANSPORTATION_EDIT_TAB.MEDIA,
		slot: Media,
		// section: ENUM_FORM_SECTION.MEDIA,
		ns: "transportation_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_TRANSPORTATION_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING,
		ns: "transportation_edit_page"
	}
];
