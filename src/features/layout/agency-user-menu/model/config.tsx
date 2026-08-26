import {
	BellRingIcon,
	Buildings2Icon,
	DollarMinimalisticIcon,
	KeySquare2Icon,
	SettingsIcon
} from "@solar-icons/react/outline";

import { ENUM_PATH } from "@/shared/config";

import type { IUserMenu } from "./types";

export const AGENCY_USER_MENU_LIST: IUserMenu[] = [
	{
		menu: [
			{
				label: "agency.settings.personal.menu.account",
				description:
					"agency.settings.personal.menu.account_description",
				path: ENUM_PATH.AGENCY.SETTINGS.ACCOUNT_SETTINGS,
				icon: <SettingsIcon />
			},
			{
				label: "agency.settings.personal.menu.security",
				description:
					"agency.settings.personal.menu.security_description",
				path: ENUM_PATH.AGENCY.SETTINGS.SECURITY,
				icon: <KeySquare2Icon />
			},
			{
				label: "agency.settings.personal.menu.notifications",
				description:
					"agency.settings.personal.menu.notifications_description",
				path: ENUM_PATH.AGENCY.SETTINGS.NOTIFICATIONS,
				icon: <BellRingIcon />
			}
		]
	},
	{
		menu: [
			{
				label: "agency.settings.business.menu.business",
				description:
					"agency.settings.business.menu.business_description",
				path: ENUM_PATH.AGENCY.SETTINGS.BUSINESS_SETTINGS,
				icon: <Buildings2Icon />
			},
			{
				label: "agency.settings.business.menu.financial",
				description:
					"agency.settings.business.menu.financial_description",
				path: ENUM_PATH.AGENCY.SETTINGS.FINANCIAL_SETTINGS,
				icon: <DollarMinimalisticIcon />
			}
		]
	}
];
