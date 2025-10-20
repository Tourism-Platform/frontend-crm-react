import { Media, Pricing } from "../../../ui";
import { GeneralInfo } from "../../ui";
import {
	ENUM_TRANSPORTATION_EDIT_TAB,
	type ITransportationEditTabs
} from "../types";

export const TRANSPORTATION_EDIT_TABS_LIST: ITransportationEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_TRANSPORTATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.media",
		type: ENUM_TRANSPORTATION_EDIT_TAB.MEDIA,
		slot: Media
	},
	{
		label: "tabs.pricing",
		type: ENUM_TRANSPORTATION_EDIT_TAB.PRICING,
		slot: Pricing
	}
];
