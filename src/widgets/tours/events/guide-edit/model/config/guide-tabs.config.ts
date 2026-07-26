import { ENUM_GUIDE_EDIT_TAB } from "@/entities/tour";

import { Media } from "../../../ui";
import { GuidesInfo, Pricing } from "../../ui";
import { ENUM_FORM_SECTION, type IGuideEditTabs } from "../types";

export const GUIDE_EDIT_TABS_LIST: IGuideEditTabs[] = [
	{
		label: "tabs.guides",
		type: ENUM_GUIDE_EDIT_TAB.GUIDES,
		slot: GuidesInfo,
		section: ENUM_FORM_SECTION.GUIDES
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
