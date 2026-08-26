export const ENUM_SETTINGS_TAB = {
	GENERAL: "general",
	FINANCE: "finance"
} as const;

export type ENUM_SETTINGS_TAB_TYPE =
	(typeof ENUM_SETTINGS_TAB)[keyof typeof ENUM_SETTINGS_TAB];
