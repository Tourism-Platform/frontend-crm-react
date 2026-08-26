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

import type { ISidebarMenu } from "@/shared/ui";

import { ENUM_PATH } from "../routes.config";

export const OPERATOR_SETTINGS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.settings.personal.title",
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
		title: "operator.settings.business.title",
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

export const AGENCY_SETTINGS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "agency.settings.personal.title",
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
		title: "agency.settings.business.title",
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
