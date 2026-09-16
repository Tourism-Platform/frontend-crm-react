import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_EDIT_TAB,
	type ENUM_ACCOMMODATION_EDIT_TAB_TYPE,
	type TAccommodationEditSchema
} from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import { Media } from "../../../ui";
import { GeneralInfo, Pricing, RoomsInfo } from "../../ui";
import { ENUM_FORM_SECTION, type ENUM_FORM_SECTION_TYPE } from "../types";

export const ACCOMMODATION_EDIT_TABS_LIST: IQueryTab<
	ENUM_ACCOMMODATION_EDIT_TAB_TYPE,
	"accommodation_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TAccommodationEditSchema,
	TEventPoolUiProps
>[] = [
	{
		label: "tabs.general",
		type: ENUM_ACCOMMODATION_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL,
		getSlotProps: (ctx) => ctx
	},
	{
		label: "tabs.rooms",
		type: ENUM_ACCOMMODATION_EDIT_TAB.ROOMS,
		slot: RoomsInfo,
		section: ENUM_FORM_SECTION.ROOMS
	},
	{
		label: "tabs.media",
		type: ENUM_ACCOMMODATION_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "accommodation_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_ACCOMMODATION_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
