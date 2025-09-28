import { ENUM_PATH } from "@/shared/config";
import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{
		label: "owner.tours.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.TOURS.OVERVIEW,
				label: "owner.tours.menu.overview"
			},
			{
				href: ENUM_PATH.TOURS.ITINERARY,
				label: "owner.tours.menu.itinerary"
			},
			{
				href: ENUM_PATH.TOURS.SCHEDULE,
				label: "owner.tours.menu.schedule"
			},
			{
				href: ENUM_PATH.TOURS.PRICING_REVIEW,
				label: "owner.tours.menu.pricing_review"
			},
			{
				href: ENUM_PATH.TOURS.ORDER_HISTORY,
				label: "owner.tours.menu.order_history"
			},
			{
				href: ENUM_PATH.TOURS.MESSAGES,
				label: "owner.tours.menu.messages"
			},
			{
				href: ENUM_PATH.TOURS.ACTIVITY_LOG,
				label: "owner.tours.menu.activity_log"
			}
		]
	},
	{
		label: "owner.booking.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.BOOKING.BOOKING_REQUESTS,
				label: "owner.booking.menu.booking_requests"
			},
			{
				href: ENUM_PATH.BOOKING.APPEALS,
				label: "owner.booking.menu.appeals"
			}
		]
	},
	{
		label: "owner.library.title",
		submenu: true,
		items: [{ href: "#", label: "owner.library.menu.analytics" }]
	}
];
