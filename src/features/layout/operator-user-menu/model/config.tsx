import {
	BellRingIcon,
	Buildings2Icon,
	DollarMinimalisticIcon,
	GlobalIcon,
	KeySquare2Icon,
	SettingsIcon,
	TagIcon,
	UsersGroupTwoRoundedIcon
} from "@solar-icons/react/outline";

import { ENUM_PATH } from "@/shared/config";

import type { IUserMenu } from "./types";

export const OPERATOR_USER_MENU_LIST: IUserMenu[] = [
	{
		menu: [
			{
				label: "operator.settings.personal.menu.account",
				description:
					"operator.settings.personal.menu.account_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.ACCOUNT_SETTINGS,
				icon: <SettingsIcon />
			},
			{
				label: "operator.settings.personal.menu.security",
				description:
					"operator.settings.personal.menu.security_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.SECURITY,
				icon: <KeySquare2Icon />
			},
			{
				label: "operator.settings.personal.menu.notifications",
				description:
					"operator.settings.personal.menu.notifications_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.NOTIFICATIONS,
				icon: <BellRingIcon />
			}
		]
	},
	{
		menu: [
			{
				label: "operator.settings.business.menu.business",
				description:
					"operator.settings.business.menu.business_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.BUSINESS_SETTINGS,
				icon: <Buildings2Icon />
			},
			{
				label: "operator.settings.business.menu.staff",
				description:
					"operator.settings.business.menu.staff_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.STAFF_INFORMATION,
				icon: <UsersGroupTwoRoundedIcon />
			},
			{
				label: "operator.settings.business.menu.financial",
				description:
					"operator.settings.business.menu.financial_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.FINANCIAL_SETTINGS,
				icon: <DollarMinimalisticIcon />
			},
			{
				label: "operator.settings.business.menu.tour",
				description: "operator.settings.business.menu.tour_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.TOUR_SETTINGS,
				icon: <GlobalIcon />
			},
			{
				label: "operator.settings.business.menu.tags",
				description: "operator.settings.business.menu.tags_description",
				path: ENUM_PATH.OPERATOR.SETTINGS.TAGS,
				icon: <TagIcon />
			}
		]
	}
];
