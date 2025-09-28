import {
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	type IRouting,
	SETTINGS_SIDEBAR_LIST
} from "@/shared/config";

import { NotFoundPage } from "@/pages/not-found-page";
import {
	AccountSettingsPage,
	BusinessInformationPage,
	FinancialSettingsPage,
	NotificationsPage,
	SecurityPage,
	StaffInformationPage,
	TagsPage,
	TourSettingsPage
} from "@/pages/settings";

export const ALL_APP_ROUTES_LIST: IRouting[] = [
	// only public
	// settings
	{
		path: ENUM_PATH.SETTINGS.ACCOUNT_SETTINGS,
		component: AccountSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.BUSINESS_INFORMATION,
		component: BusinessInformationPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.FINANCIAL_SETTINGS,
		component: FinancialSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.NOTIFICATIONS,
		component: NotificationsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.SECURITY,
		component: SecurityPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.STAFF_INFORMATION,
		component: StaffInformationPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.TAGS,
		component: TagsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.SETTINGS.TOUR_SETTINGS,
		component: TourSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST
	},
	// 404
	{
		path: ENUM_PATH.NOT_FOUND,
		component: NotFoundPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT
	}
];
