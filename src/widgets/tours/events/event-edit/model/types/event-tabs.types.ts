import type { FC } from "react";

import type { TTourEventEditPageKeys } from "@/shared/config";

export const ENUM_EVENT_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_EVENT_EDIT_TAB_TYPE =
	(typeof ENUM_EVENT_EDIT_TAB)[keyof typeof ENUM_EVENT_EDIT_TAB];

export interface IEventEditTabs {
	label: TTourEventEditPageKeys;
	type: ENUM_EVENT_EDIT_TAB_TYPE;
	slot: FC;
}
