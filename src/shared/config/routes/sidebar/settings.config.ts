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

export const SETTINGS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "owner.settings.personal.title",
		menu: [
			{
				label: "owner.settings.personal.menu.account",
				path: ENUM_PATH.SETTINGS.ACCOUNT_SETTINGS,
				icon: SettingsIcon
			},
			{
				label: "owner.settings.personal.menu.security",
				path: ENUM_PATH.SETTINGS.SECURITY,
				icon: LockHoleIcon
			},
			{
				label: "owner.settings.personal.menu.notifications",
				path: ENUM_PATH.SETTINGS.NOTIFICATIONS,
				icon: NotificationBigIcon
			}
		]
	},
	{
		title: "owner.settings.business.title",
		menu: [
			{
				label: "owner.settings.business.menu.business",
				path: ENUM_PATH.SETTINGS.BUSINESS_SETTINGS,
				icon: HouseIcon
			},
			{
				label: "owner.settings.business.menu.staff",
				path: ENUM_PATH.SETTINGS.STAFF_INFORMATION,
				icon: UsersIcon
			},
			{
				label: "owner.settings.business.menu.financial",
				path: ENUM_PATH.SETTINGS.FINANCIAL_SETTINGS,
				icon: DollarSquareIcon
			},
			{
				label: "owner.settings.business.menu.tour",
				path: ENUM_PATH.SETTINGS.TOUR_SETTINGS,
				icon: GlobeIcon
			},
			{
				label: "owner.settings.business.menu.tags",
				path: ENUM_PATH.SETTINGS.TAGS,
				icon: TagIcon
			}
		]
	}
];
