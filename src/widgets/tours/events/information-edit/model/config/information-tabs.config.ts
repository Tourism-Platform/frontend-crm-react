import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_INFORMATION_EDIT_TAB,
	type ENUM_INFORMATION_EDIT_TAB_TYPE,
	type TInfoEditSchema
} from "@/entities/tour";

import { Media } from "../../../ui";
import { GeneralInfo } from "../../ui";
import { ENUM_FORM_SECTION, type ENUM_FORM_SECTION_TYPE } from "../types";

export const INFORMATION_EDIT_TABS_LIST: IQueryTab<
	ENUM_INFORMATION_EDIT_TAB_TYPE,
	"information_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TInfoEditSchema
>[] = [
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
