import { CalendarDaysIcon, TaskSquareIcon } from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const BOOKING_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "owner.booking.general.title",
		menu: [
			{
				label: "owner.booking.general.menu.booking_requests",
				path: ENUM_PATH.BOOKING.BOOKING_REQUESTS,
				icon: TaskSquareIcon
			},
			{
				label: "owner.booking.general.menu.appeals",
				path: ENUM_PATH.BOOKING.APPEALS,
				icon: CalendarDaysIcon
			}
		]
	}
];
