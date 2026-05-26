import { ENUM_PATH } from "@/shared/config";
import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{
		label: "agency.catalog.title",
		href: ENUM_PATH.TOURS.CATALOG.ROOT
	}
	// {
	// 	label: "agency.booking.title",
	// 	submenu: true,
	// 	items: [
	// 		{
	// 			href: ENUM_PATH.BOOKING.ORDERS,
	// 			label: "agency.booking.menu.orders",
	// 			icon: TaskSquareIcon
	// 		},
	// 		{
	// 			href: ENUM_PATH.BOOKING.APPEALS,
	// 			label: "agency.booking.menu.appeals",
	// 			icon: CalendarDaysIcon
	// 		}
	// 	]
	// },
	// {
	// 	label: "agency.finance.title",
	// 	submenu: true,
	// 	items: [
	// 		{
	// 			href: ENUM_PATH.FINANCE.INVOICES,
	// 			label: "agency.finance.menu.invoices",
	// 			icon: ReceiptIcon2
	// 		},
	// 		{
	// 			href: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
	// 			label: "agency.finance.menu.client_payments",
	// 			icon: DollarSquareIcon
	// 		},
	// 		{
	// 			href: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
	// 			label: "agency.finance.menu.supplier_payments",
	// 			icon: ReceiptIcon
	// 		},
	// 		{
	// 			href: ENUM_PATH.FINANCE.RECONCILIATION,
	// 			label: "agency.finance.menu.reconciliation",
	// 			icon: MoneysIcon
	// 		}
	// 	]
	// },
	// {
	// 	label: "agency.library.title",
	// 	submenu: true,
	// 	items: [{ href: "#", label: "agency.library.menu.analytics" }]
	// }
];
