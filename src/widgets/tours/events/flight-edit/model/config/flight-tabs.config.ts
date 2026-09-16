import { type IQueryTab } from "@/shared/ui";

import {
	ENUM_FLIGHT_EDIT_TAB,
	type ENUM_FLIGHT_EDIT_TAB_TYPE,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	type TFlightEditSchema
} from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import { Media } from "../../../ui";
import { GeneralInfo, Pricing } from "../../ui";
import { type ENUM_FORM_SECTION_TYPE } from "../types";

export const FLIGHT_EDIT_TABS_LIST: IQueryTab<
	ENUM_FLIGHT_EDIT_TAB_TYPE,
	"flight_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TFlightEditSchema,
	TEventPoolUiProps
>[] = [
	{
		label: "tabs.general",
		type: ENUM_FLIGHT_EDIT_TAB.GENERAL,
		slot: GeneralInfo,
		section: ENUM_FORM_SECTION.GENERAL,
		getSlotProps: (ctx) => ctx
	},
	{
		label: "tabs.media",
		type: ENUM_FLIGHT_EDIT_TAB.MEDIA,
		slot: Media,
		ns: "flight_edit_page"
	},
	{
		label: "tabs.pricing",
		type: ENUM_FLIGHT_EDIT_TAB.PRICING,
		slot: Pricing,
		section: ENUM_FORM_SECTION.PRICING
	}
];
