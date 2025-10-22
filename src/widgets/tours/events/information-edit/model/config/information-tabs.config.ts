import { Media } from "../../../ui";
import { GeneralInfo } from "../../ui";
import { ENUM_INFORMATION_EDIT_TAB, type IInformationEditTabs } from "../types";

export const INFORMATION_EDIT_TABS_LIST: IInformationEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_INFORMATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.media",
		type: ENUM_INFORMATION_EDIT_TAB.MEDIA,
		slot: Media
	}
];
