import type { FC } from "react";

import type { TTourSettingsPageKeys } from "@/shared/config";

export const ENUM_SETTINGS_TAB = {
	GENERAL: "general",
	FINANCE: "finance"
} as const;

export type ENUM_SETTINGS_TAB_TYPE =
	(typeof ENUM_SETTINGS_TAB)[keyof typeof ENUM_SETTINGS_TAB];

export interface ISettingsTabs {
	label: TTourSettingsPageKeys;
	type: ENUM_SETTINGS_TAB_TYPE;
	slot: FC;
}
