import {
	CalendarDaysIcon,
	DollarSquareIcon,
	MoneysIcon,
	ReceiptIcon,
	ReceiptIcon2,
	TaskSquareIcon
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{
		label: "owner.tours.title",
		href: ENUM_PATH.TOURS.ROOT
		// submenu: true,
		// items: [
		// 	{
		// 		href: ENUM_PATH.TOURS.OVERVIEW,
		// 		label: "owner.tours.menu.overview",
		// 		icon: CalendarDaysIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.ITINERARY,
		// 		label: "owner.tours.menu.itinerary",
		// 		icon: MapPinIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.SCHEDULE,
		// 		label: "owner.tours.menu.schedule",
		// 		icon: ClockIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.PRICING_REVIEW,
		// 		label: "owner.tours.menu.pricing_review",
		// 		icon: PercentCircleIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.ORDER_HISTORY,
		// 		label: "owner.tours.menu.order_history",
		// 		icon: CheckIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.MESSAGES,
		// 		label: "owner.tours.menu.messages",
		// 		icon: MessagesCircleIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.ACTIVITY_LOG,
		// 		label: "owner.tours.menu.activity_log",
		// 		icon: HealthIcon
		// 	}
		// ]
	},
	{
		label: "owner.booking.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.BOOKING.BOOKING_REQUESTS,
				label: "owner.booking.menu.booking_requests",
				icon: TaskSquareIcon
			},
			{
				href: ENUM_PATH.BOOKING.APPEALS,
				label: "owner.booking.menu.appeals",
				icon: CalendarDaysIcon
			}
		]
	},
	{
		label: "owner.finance.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.FINANCE.INVOICES,
				label: "owner.finance.menu.invoices",
				icon: ReceiptIcon2
			},
			{
				href: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
				label: "owner.finance.menu.client_payments",
				icon: DollarSquareIcon
			},
			{
				href: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
				label: "owner.finance.menu.supplier_payments",
				icon: ReceiptIcon
			},
			{
				href: ENUM_PATH.FINANCE.RECONCILIATION,
				label: "owner.finance.menu.reconciliation",
				icon: MoneysIcon
			}
		]
	},
	{
		label: "owner.library.title",
		submenu: true,
		items: [{ href: "#", label: "owner.library.menu.analytics" }]
	}
];
