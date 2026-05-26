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
		label: "operator.tours.title",
		href: ENUM_PATH.TOURS.ROOT
		// submenu: true,
		// items: [
		// 	{
		// 		href: ENUM_PATH.TOURS.OVERVIEW,
		// 		label: "operator.tours.menu.overview",
		// 		icon: CalendarDaysIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.ITINERARY,
		// 		label: "operator.tours.menu.itinerary",
		// 		icon: MapPinIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.SCHEDULE,
		// 		label: "operator.tours.menu.schedule",
		// 		icon: ClockIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.PRICING_REVIEW,
		// 		label: "operator.tours.menu.pricing_review",
		// 		icon: PercentCircleIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.ORDER_HISTORY,
		// 		label: "operator.tours.menu.order_history",
		// 		icon: CheckIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.MESSAGES,
		// 		label: "operator.tours.menu.messages",
		// 		icon: MessagesCircleIcon
		// 	},
		// 	{
		// 		href: ENUM_PATH.TOURS.ACTIVITY_LOG,
		// 		label: "operator.tours.menu.activity_log",
		// 		icon: HealthIcon
		// 	}
		// ]
	},
	{
		label: "operator.booking.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.BOOKING.ORDERS,
				label: "operator.booking.menu.orders",
				icon: TaskSquareIcon
			},
			{
				href: ENUM_PATH.BOOKING.APPEALS,
				label: "operator.booking.menu.appeals",
				icon: CalendarDaysIcon
			}
		]
	},
	{
		label: "operator.finance.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.FINANCE.INVOICES,
				label: "operator.finance.menu.invoices",
				icon: ReceiptIcon2
			},
			{
				href: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
				label: "operator.finance.menu.client_payments",
				icon: DollarSquareIcon
			},
			{
				href: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
				label: "operator.finance.menu.supplier_payments",
				icon: ReceiptIcon
			},
			{
				href: ENUM_PATH.FINANCE.RECONCILIATION,
				label: "operator.finance.menu.reconciliation",
				icon: MoneysIcon
			}
		]
	},
	{
		label: "operator.library.title",
		submenu: true,
		items: [{ href: "#", label: "operator.library.menu.analytics" }]
	}
];
