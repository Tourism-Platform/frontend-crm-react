import { CalendarDaysIcon, TaskSquareIcon } from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const BOOKING_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.booking.general.title",
		menu: [
			{
				label: "operator.booking.general.menu.orders",
				path: ENUM_PATH.BOOKING.ORDERS,
				icon: TaskSquareIcon
			},
			{
				label: "operator.booking.general.menu.appeals",
				path: ENUM_PATH.BOOKING.APPEALS,
				icon: CalendarDaysIcon
			}
		]
	}
];
