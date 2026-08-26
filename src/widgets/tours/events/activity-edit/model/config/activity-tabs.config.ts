import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_ACTIVITY_EDIT_TAB,
	type ENUM_ACTIVITY_EDIT_TAB_TYPE,
	type TActivityEditSchema
} from "@/entities/tour";

import { Media } from "../../../ui";
import { GeneralInfo, Pricing } from "../../ui";
import { ENUM_FORM_SECTION, type ENUM_FORM_SECTION_TYPE } from "../types";

export const EVENT_EDIT_TABS_LIST: IQueryTab<
	ENUM_ACTIVITY_EDIT_TAB_TYPE,
	"activity_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TActivityEditSchema
>[] = [
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
