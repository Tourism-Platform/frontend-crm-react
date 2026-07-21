import { BoxOutlineIcon, CalendarDaysIcon, HouseIcon } from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const LIBRARY_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.library.general.title",
		menu: [
			{
				label: "operator.library.general.menu.events",
				path: ENUM_PATH.LIBRARY.EVENTS,
				icon: BoxOutlineIcon
			},
			{
				label: "operator.library.general.menu.itineraries",
				path: ENUM_PATH.LIBRARY.ITINERARIES,
				icon: CalendarDaysIcon
			},
			{
				label: "operator.library.general.menu.suppliers",
				path: ENUM_PATH.LIBRARY.SUPPLIERS,
				icon: HouseIcon
			}
		]
	}
];
