import { Media } from "../../../ui";
import { ItemsInfo, Pricing } from "../../ui";
import {
	ENUM_FORM_SECTION,
	ENUM_SUPPLEMENT_EDIT_TAB,
	type ISupplementEditTabs
} from "../types";

export const SUPPLEMENT_EDIT_TABS_LIST: ISupplementEditTabs[] = [
	{
		label: "tabs.items",
		type: ENUM_SUPPLEMENT_EDIT_TAB.ITEMS,
		slot: ItemsInfo,
		section: ENUM_FORM_SECTION.ITEMS
	},
	{
		label: "tabs.media",
		type: ENUM_SUPPLEMENT_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "supplement_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_SUPPLEMENT_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
