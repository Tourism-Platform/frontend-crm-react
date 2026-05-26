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

import type { IUserMenu } from "./types";

export const OPERATOR_USER_MENU_LIST: IUserMenu[] = [
	{
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
