import { CalendarDaysIcon, TaskSquareIcon } from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const OPERATOR_BOOKING_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.booking.general.title",
		menu: [
			{
				label: "operator.booking.general.menu.orders",
				path: ENUM_PATH.OPERATOR.BOOKING.ORDERS,
				icon: TaskSquareIcon
			},
			{
				label: "operator.booking.general.menu.appeals",
				path: ENUM_PATH.OPERATOR.BOOKING.APPEALS,
				icon: CalendarDaysIcon
			}
		]
	}
];

export const AGENCY_BOOKING_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "agency.booking.general.title",
		menu: [
			{
				label: "agency.booking.general.menu.orders",
				path: ENUM_PATH.AGENCY.BOOKING.ORDERS,
				icon: TaskSquareIcon
			},
			{
				label: "agency.booking.general.menu.appeals",
				path: ENUM_PATH.AGENCY.BOOKING.APPEALS,
				icon: CalendarDaysIcon
			}
		]
	}
];
