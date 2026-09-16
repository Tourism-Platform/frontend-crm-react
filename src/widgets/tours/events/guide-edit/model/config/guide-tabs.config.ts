import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_GUIDE_EDIT_TAB,
	type ENUM_GUIDE_EDIT_TAB_TYPE,
	type TGuideEditSchema
} from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import { Media } from "../../../ui";
import { GuidesInfo, Pricing } from "../../ui";
import { ENUM_FORM_SECTION, type ENUM_FORM_SECTION_TYPE } from "../types";

export const GUIDE_EDIT_TABS_LIST: IQueryTab<
	ENUM_GUIDE_EDIT_TAB_TYPE,
	"guide_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TGuideEditSchema,
	TEventPoolUiProps
>[] = [
	{
		label: "tabs.guides",
		type: ENUM_GUIDE_EDIT_TAB.GUIDES,
		slot: GuidesInfo,
		section: ENUM_FORM_SECTION.GUIDES,
		getSlotProps: (ctx) => ctx
	},
	{
		label: "tabs.media",
		type: ENUM_GUIDE_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "guide_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_GUIDE_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
