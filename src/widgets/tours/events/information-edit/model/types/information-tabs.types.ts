import type { FC } from "react";

import type { TTourInformationEditPageKeys } from "@/shared/config";

export const ENUM_INFORMATION_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media"
} as const;

export type ENUM_INFORMATION_EDIT_TAB_TYPE =
	(typeof ENUM_INFORMATION_EDIT_TAB)[keyof typeof ENUM_INFORMATION_EDIT_TAB];

export interface IInformationEditTabs {
	label: TTourInformationEditPageKeys;
	type: ENUM_INFORMATION_EDIT_TAB_TYPE;
	slot: FC;
}
