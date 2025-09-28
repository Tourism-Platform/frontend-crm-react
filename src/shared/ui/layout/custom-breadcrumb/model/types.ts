import type {
	TBookingPath,
	TSettingsPath,
	TSidebarKeys,
	TToursPath
} from "@/shared/config";

export type TBreadcrumbList = Record<
	TSettingsPath | TToursPath | TBookingPath,
	TSidebarKeys
>;
