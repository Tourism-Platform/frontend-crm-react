import { CallChatIcon, NotebookIcon } from "@solar-icons/react/outline";

import { ENUM_PATH } from "@/shared/config";
import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{
		label: "agency.catalog.title",
		href: ENUM_PATH.TOURS.CATALOG.ROOT
	},
	{
		label: "agency.booking.title",
		submenu: true,
		items: [
			{
				href: ENUM_PATH.AGENCY.BOOKING.ORDERS,
				label: "agency.booking.menu.orders",
				description: "agency.booking.menu.orders_description",
				icon: <NotebookIcon />
			},
			{
				href: ENUM_PATH.AGENCY.BOOKING.APPEALS,
				label: "agency.booking.menu.appeals",
				description: "agency.booking.menu.appeals_description",
				icon: <CallChatIcon />
			}
		]
	}
];
