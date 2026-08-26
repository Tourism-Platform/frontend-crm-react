import {
	BillListIcon,
	BoxIcon,
	CallChatIcon,
	CardReceiveIcon,
	CardSearchIcon,
	CardSendIcon,
	MapPointWaveIcon,
	NotebookIcon,
	Routing2Icon
} from "@solar-icons/react/outline";

import { ENUM_PATH } from "@/shared/config";
import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{
		label: "operator.tours.title",
		href: ENUM_PATH.TOURS.ROOT
	},
	{
		label: "operator.booking.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.OPERATOR.BOOKING.ORDERS,
				label: "operator.booking.menu.orders",
				description: "operator.booking.menu.orders_description",
				icon: <NotebookIcon />
			},
			{
				href: ENUM_PATH.OPERATOR.BOOKING.APPEALS,
				label: "operator.booking.menu.appeals",
				description: "operator.booking.menu.appeals_description",
				icon: <CallChatIcon />
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
				description: "operator.finance.menu.invoices_description",
				icon: <BillListIcon />
			},
			{
				href: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
				label: "operator.finance.menu.client_payments",
				description:
					"operator.finance.menu.client_payments_description",
				icon: <CardReceiveIcon />
			},
			{
				href: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
				label: "operator.finance.menu.supplier_payments",
				description:
					"operator.finance.menu.supplier_payments_description",
				icon: <CardSendIcon />
			},
			{
				href: ENUM_PATH.FINANCE.RECONCILIATION,
				label: "operator.finance.menu.reconciliation",
				description: "operator.finance.menu.reconciliation_description",
				icon: <CardSearchIcon />
			}
		]
	},
	{
		label: "operator.library.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.LIBRARY.EVENTS,
				label: "operator.library.menu.events",
				description: "operator.library.menu.events_description",
				icon: <MapPointWaveIcon />
			},
			{
				href: ENUM_PATH.LIBRARY.ITINERARIES,
				label: "operator.library.menu.itineraries",
				description: "operator.library.menu.itineraries_description",
				icon: <Routing2Icon />
			},
			{
				href: ENUM_PATH.LIBRARY.SUPPLIERS,
				label: "operator.library.menu.suppliers",
				description: "operator.library.menu.suppliers_description",
				icon: <BoxIcon />
			}
		]
	}
];
