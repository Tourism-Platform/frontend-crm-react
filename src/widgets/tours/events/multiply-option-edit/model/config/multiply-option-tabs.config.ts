import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_MULTIPLY_OPTION_EDIT_TAB,
	type ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE,
	type TMultiplyOptionEditSchema
} from "@/entities/tour";

import { Media } from "../../../ui";
import { GeneralInfo } from "../../ui";
import { ENUM_FORM_SECTION, type ENUM_FORM_SECTION_TYPE } from "../types";

export const MULTIPLY_OPTION_EDIT_TABS_LIST: IQueryTab<
	ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE,
	"multiply_option_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TMultiplyOptionEditSchema
>[] = [
	{
		label: "tabs.general",
		type: ENUM_MULTIPLY_OPTION_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL
	},
	{
		label: "tabs.media",
		type: ENUM_MULTIPLY_OPTION_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "multiply_option_edit_page"
	}
];
