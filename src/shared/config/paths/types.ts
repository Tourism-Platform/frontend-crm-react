import type { ENUM_PATH } from "./config";

export type TSettingsPath =
	(typeof ENUM_PATH.SETTINGS)[keyof typeof ENUM_PATH.SETTINGS];
