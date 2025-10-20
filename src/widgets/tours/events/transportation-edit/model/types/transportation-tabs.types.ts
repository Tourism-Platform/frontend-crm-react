import type { FC } from "react";

import type { TTourEventTransportationEditPageKeys } from "@/shared/config";

export const ENUM_TRANSPORTATION_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_TRANSPORTATION_EDIT_TAB_TYPE =
	(typeof ENUM_TRANSPORTATION_EDIT_TAB)[keyof typeof ENUM_TRANSPORTATION_EDIT_TAB];

export interface ITransportationEditTabs {
	label: TTourEventTransportationEditPageKeys;
	type: ENUM_TRANSPORTATION_EDIT_TAB_TYPE;
	slot: FC;
}
