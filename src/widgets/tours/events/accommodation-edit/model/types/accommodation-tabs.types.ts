import type { FC } from "react";

import type { TTourAccommodationEditPageKeys } from "@/shared/config";

export const ENUM_ACCOMMODATION_EDIT_TAB = {
	GENERAL: "general",
	ROOMS: "rooms",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_ACCOMMODATION_EDIT_TAB_TYPE =
	(typeof ENUM_ACCOMMODATION_EDIT_TAB)[keyof typeof ENUM_ACCOMMODATION_EDIT_TAB];

export interface IAccommodationEditTabs {
	label: TTourAccommodationEditPageKeys;
	type: ENUM_ACCOMMODATION_EDIT_TAB_TYPE;
	slot: FC;
}
