import {
	CalendarSearchIcon,
	ChartIcon,
	Dialog2Icon,
	DollarMinimalisticIcon,
	GalleryIcon,
	Notebook2Icon,
	NotebookIcon,
	Routing2Icon,
	SettingsIcon
} from "@solar-icons/react/outline";

import type { ISidebarMenu } from "@/shared/ui";

import { ENUM_PATH } from "../routes.config";

export const TOURS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.tours.general.title",
		menu: [
			{
				label: "operator.tours.general.menu.overview",
				description: "operator.tours.general.menu.overview_description",
				path: ENUM_PATH.TOURS.OVERVIEW,
				icon: <ChartIcon />
			},
			{
				label: "operator.tours.general.menu.landing",
				description: "operator.tours.general.menu.landing_description",
				path: ENUM_PATH.TOURS.LANDING,
				icon: <GalleryIcon />
			},
			{
				label: "operator.tours.general.menu.itinerary",
				description:
					"operator.tours.general.menu.itinerary_description",
				path: ENUM_PATH.TOURS.ITINERARY,
				icon: <Routing2Icon />
			},
			{
				label: "operator.tours.general.menu.schedule",
				description: "operator.tours.general.menu.schedule_description",
				path: ENUM_PATH.TOURS.SCHEDULE,
				icon: <CalendarSearchIcon />
			},
			{
				label: "operator.tours.general.menu.pricing_review",
				description:
					"operator.tours.general.menu.pricing_review_description",
				path: ENUM_PATH.TOURS.PRICING_REVIEW,
				icon: <DollarMinimalisticIcon />
			}
		]
	},
	{
		title: "operator.tours.more.title",
		menu: [
			{
				label: "operator.tours.more.menu.order_history",
				description:
					"operator.tours.more.menu.order_history_description",
				path: ENUM_PATH.TOURS.ORDER_HISTORY,
				icon: <NotebookIcon />
			},
			{
				label: "operator.tours.more.menu.messages",
				description: "operator.tours.more.menu.messages_description",
				path: ENUM_PATH.TOURS.MESSAGES,
				icon: <Dialog2Icon />
			},
			{
				label: "operator.tours.more.menu.activity_log",
				description:
					"operator.tours.more.menu.activity_log_description",
				path: ENUM_PATH.TOURS.ACTIVITY_LOG,
				icon: <Notebook2Icon />
			},
			{
				label: "operator.tours.more.menu.settings",
				description: "operator.tours.more.menu.settings_description",
				path: ENUM_PATH.TOURS.SETTINGS,
				icon: <SettingsIcon />
			}
		]
	}
];
