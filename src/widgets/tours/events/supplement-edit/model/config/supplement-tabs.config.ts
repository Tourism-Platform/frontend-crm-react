import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_SUPPLEMENT_EDIT_TAB,
	type ENUM_SUPPLEMENT_EDIT_TAB_TYPE,
	type TSupplementEditSchema
} from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import { Media } from "../../../ui";
import { ItemsInfo, Pricing } from "../../ui";
import { ENUM_FORM_SECTION, type ENUM_FORM_SECTION_TYPE } from "../types";

export const SUPPLEMENT_EDIT_TABS_LIST: IQueryTab<
	ENUM_SUPPLEMENT_EDIT_TAB_TYPE,
	"supplement_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TSupplementEditSchema,
	TEventPoolUiProps
>[] = [
	{
		label: "tabs.items",
		type: ENUM_SUPPLEMENT_EDIT_TAB.ITEMS,
		slot: ItemsInfo,
		section: ENUM_FORM_SECTION.ITEMS,
		getSlotProps: (ctx) => ctx
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
