import { ENUM_INFORMATION_EDIT_TAB } from "@/entities/tour";

import { Media } from "../../../ui";
import { GeneralInfo } from "../../ui";
import { ENUM_FORM_SECTION, type IInformationEditTabs } from "../types";

export const INFORMATION_EDIT_TABS_LIST: IInformationEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_INFORMATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL
	},
	{
		label: "tabs.media",
		type: ENUM_INFORMATION_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "information_edit_page"
	}
];
