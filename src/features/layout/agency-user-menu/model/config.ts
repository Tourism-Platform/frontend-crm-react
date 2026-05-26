import {
	DollarSquareIcon,
	HouseIcon,
	LockHoleIcon,
	NotificationBigIcon,
	SettingsIcon
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";

import type { IUserMenu } from "./types";

export const AGENCY_USER_MENU_LIST: IUserMenu[] = [
	{
		menu: [
			{
				label: "agency.settings.personal.menu.account",
				path: ENUM_PATH.OPERATOR.SETTINGS.ACCOUNT_SETTINGS,
				icon: SettingsIcon
			},
			{
				label: "agency.settings.personal.menu.security",
				path: ENUM_PATH.OPERATOR.SETTINGS.SECURITY,
				icon: LockHoleIcon
			},
			{
				label: "agency.settings.personal.menu.notifications",
				path: ENUM_PATH.OPERATOR.SETTINGS.NOTIFICATIONS,
				icon: NotificationBigIcon
			}
		]
	},
	{
		menu: [
			{
				label: "agency.settings.business.menu.business",
				path: ENUM_PATH.OPERATOR.SETTINGS.BUSINESS_SETTINGS,
				icon: HouseIcon
			},
			{
				label: "agency.settings.business.menu.financial",
				path: ENUM_PATH.OPERATOR.SETTINGS.FINANCIAL_SETTINGS,
				icon: DollarSquareIcon
			}
		]
	}
];
