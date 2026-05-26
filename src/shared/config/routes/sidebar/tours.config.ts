import {
	CalendarDaysIcon,
	CheckIcon,
	ClockIcon,
	DocumentIcon,
	HealthIcon,
	MapPinIcon,
	MessagesCircleIcon,
	PercentCircleIcon,
	SettingsIcon
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const TOURS_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.tours.general.title",
		menu: [
			{
				label: "operator.tours.general.menu.overview",
				path: ENUM_PATH.TOURS.OVERVIEW,
				icon: CalendarDaysIcon
			},
			{
				label: "operator.tours.general.menu.landing",
				path: ENUM_PATH.TOURS.LANDING,
				icon: DocumentIcon
			},
			{
				label: "operator.tours.general.menu.itinerary",
				path: ENUM_PATH.TOURS.ITINERARY,
				icon: MapPinIcon
			},
			{
				label: "operator.tours.general.menu.schedule",
				path: ENUM_PATH.TOURS.SCHEDULE,
				icon: ClockIcon
			},
			{
				label: "operator.tours.general.menu.pricing_review",
				path: ENUM_PATH.TOURS.PRICING_REVIEW,
				icon: PercentCircleIcon
			}
		]
	},
	{
		title: "operator.tours.more.title",
		menu: [
			{
				label: "operator.tours.more.menu.order_history",
				path: ENUM_PATH.TOURS.ORDER_HISTORY,
				icon: CheckIcon
			},
			{
				label: "operator.tours.more.menu.messages",
				path: ENUM_PATH.TOURS.MESSAGES,
				icon: MessagesCircleIcon
			},
			{
				label: "operator.tours.more.menu.activity_log",
				path: ENUM_PATH.TOURS.ACTIVITY_LOG,
				icon: HealthIcon
			},
			{
				label: "operator.tours.more.menu.settings",
				path: ENUM_PATH.TOURS.SETTINGS,
				icon: SettingsIcon
			}
		]
	}
];
