import {
	DollarSquareIcon,
	GlobeIcon,
	HouseIcon,
	LockHoleIcon,
	NotificationBigIcon,
	SettingsIcon,
	TagIcon,
	UsersIcon
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const OPERATOR_SETTINGS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.settings.personal.title",
		menu: [
			{
				label: "operator.settings.personal.menu.account",
				path: ENUM_PATH.OPERATOR.SETTINGS.ACCOUNT_SETTINGS,
				icon: SettingsIcon
			},
			{
				label: "operator.settings.personal.menu.security",
				path: ENUM_PATH.OPERATOR.SETTINGS.SECURITY,
				icon: LockHoleIcon
			},
			{
				label: "operator.settings.personal.menu.notifications",
				path: ENUM_PATH.OPERATOR.SETTINGS.NOTIFICATIONS,
				icon: NotificationBigIcon
			}
		]
	},
	{
		title: "operator.settings.business.title",
		menu: [
			{
				label: "operator.settings.business.menu.business",
				path: ENUM_PATH.OPERATOR.SETTINGS.BUSINESS_SETTINGS,
				icon: HouseIcon
			},
			{
				label: "operator.settings.business.menu.staff",
				path: ENUM_PATH.OPERATOR.SETTINGS.STAFF_INFORMATION,
				icon: UsersIcon
			},
			{
				label: "operator.settings.business.menu.financial",
				path: ENUM_PATH.OPERATOR.SETTINGS.FINANCIAL_SETTINGS,
				icon: DollarSquareIcon
			},
			{
				label: "operator.settings.business.menu.tour",
				path: ENUM_PATH.OPERATOR.SETTINGS.TOUR_SETTINGS,
				icon: GlobeIcon
			},
			{
				label: "operator.settings.business.menu.tags",
				path: ENUM_PATH.OPERATOR.SETTINGS.TAGS,
				icon: TagIcon
			}
		]
	}
];

export const AGENCY_SETTINGS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "agency.settings.personal.title",
		menu: [
			{
				label: "agency.settings.personal.menu.account",
				path: ENUM_PATH.AGENCY.SETTINGS.ACCOUNT_SETTINGS,
				icon: SettingsIcon
			},
			{
				label: "agency.settings.personal.menu.security",
				path: ENUM_PATH.AGENCY.SETTINGS.SECURITY,
				icon: LockHoleIcon
			},
			{
				label: "agency.settings.personal.menu.notifications",
				path: ENUM_PATH.AGENCY.SETTINGS.NOTIFICATIONS,
				icon: NotificationBigIcon
			}
		]
	},
	{
		title: "agency.settings.business.title",
		menu: [
			{
				label: "agency.settings.business.menu.business",
				path: ENUM_PATH.AGENCY.SETTINGS.BUSINESS_SETTINGS,
				icon: HouseIcon
			},
			{
				label: "agency.settings.business.menu.financial",
				path: ENUM_PATH.AGENCY.SETTINGS.FINANCIAL_SETTINGS,
				icon: DollarSquareIcon
			}
		]
	}
];
