import {
	type TBookingPath,
	type TFinancePath,
	type TSettingsPath,
	type TSidebarKeys,
	type TToursPath
} from "@/shared/config";

export type TBreadcrumbList = Record<
	TSettingsPath | TToursPath | TBookingPath | TFinancePath,
	TSidebarKeys
>;
