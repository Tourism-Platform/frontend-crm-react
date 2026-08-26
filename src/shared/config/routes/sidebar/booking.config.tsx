import { CallChatIcon, NotebookIcon } from "@solar-icons/react/outline";

import type { ISidebarMenu } from "@/shared/ui";

import { ENUM_PATH } from "../routes.config";

export const OPERATOR_BOOKING_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.booking.general.title",
		menu: [
			{
				label: "operator.booking.general.menu.orders",
				description: "operator.booking.general.menu.orders_description",
				path: ENUM_PATH.OPERATOR.BOOKING.ORDERS,
				icon: <NotebookIcon />
			},
			{
				label: "operator.booking.general.menu.appeals",
				description:
					"operator.booking.general.menu.appeals_description",
				path: ENUM_PATH.OPERATOR.BOOKING.APPEALS,
				icon: <CallChatIcon />
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
				description: "agency.booking.general.menu.orders_description",
				path: ENUM_PATH.AGENCY.BOOKING.ORDERS,
				icon: <NotebookIcon />
			},
			{
				label: "agency.booking.general.menu.appeals",
				description: "agency.booking.general.menu.appeals_description",
				path: ENUM_PATH.AGENCY.BOOKING.APPEALS,
				icon: <CallChatIcon />
			}
		]
	}
];
