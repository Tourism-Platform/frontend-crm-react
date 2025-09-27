import type { ENUM_PATH, TSidebarKeys } from "@/shared/config";

export type TSettingsPath =
	(typeof ENUM_PATH.SETTINGS)[keyof typeof ENUM_PATH.SETTINGS];

export type TBreadcrumbList = Record<TSettingsPath, TSidebarKeys>;
