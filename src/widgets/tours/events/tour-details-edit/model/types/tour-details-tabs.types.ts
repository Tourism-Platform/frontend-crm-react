import type { FC } from "react";

import type { TTourInformationEditPageKeys } from "@/shared/config";

export const ENUM_TOUR_DETAILS_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media"
} as const;

export type ENUM_TOUR_DETAILS_EDIT_TAB_TYPE =
	(typeof ENUM_TOUR_DETAILS_EDIT_TAB)[keyof typeof ENUM_TOUR_DETAILS_EDIT_TAB];

export interface ITourDetailsEditTabs {
	label: TTourInformationEditPageKeys;
	type: ENUM_TOUR_DETAILS_EDIT_TAB_TYPE;
	slot: FC;
}
