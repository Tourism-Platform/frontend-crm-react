import { ENUM_PATH } from "@/shared/config";

import type { TBreadcrumbList } from "./types";

export const BREADCRUMB_LIST: TBreadcrumbList = {
	[ENUM_PATH.SETTINGS.ROOT]: "owner.settings.title",
	[ENUM_PATH.SETTINGS.ACCOUNT_SETTINGS]:
		"owner.settings.personal.menu.account",
	[ENUM_PATH.SETTINGS.SECURITY]: "owner.settings.personal.menu.security",
	[ENUM_PATH.SETTINGS.NOTIFICATIONS]:
		"owner.settings.personal.menu.notifications",
	[ENUM_PATH.SETTINGS.BUSINESS_INFORMATION]:
		"owner.settings.business.menu.business",
	[ENUM_PATH.SETTINGS.STAFF_INFORMATION]:
		"owner.settings.business.menu.staff",
	[ENUM_PATH.SETTINGS.FINANCIAL_SETTINGS]:
		"owner.settings.business.menu.financial",
	[ENUM_PATH.SETTINGS.TOUR_SETTINGS]: "owner.settings.business.menu.tour",
	[ENUM_PATH.SETTINGS.TAGS]: "owner.settings.business.menu.tags"
};
