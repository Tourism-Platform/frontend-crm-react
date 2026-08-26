import {
	BoxIcon,
	MapPointWaveIcon,
	Routing2Icon
} from "@solar-icons/react/outline";

import type { ISidebarMenu } from "@/shared/ui";

import { ENUM_PATH } from "../routes.config";

export const LIBRARY_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.library.general.title",
		menu: [
			{
				label: "operator.library.general.menu.events",
				description: "operator.library.general.menu.events_description",
				path: ENUM_PATH.LIBRARY.EVENTS,
				icon: <MapPointWaveIcon />
			},
			{
				label: "operator.library.general.menu.itineraries",
				description:
					"operator.library.general.menu.itineraries_description",
				path: ENUM_PATH.LIBRARY.ITINERARIES,
				icon: <Routing2Icon />
			},
			{
				label: "operator.library.general.menu.suppliers",
				description:
					"operator.library.general.menu.suppliers_description",
				path: ENUM_PATH.LIBRARY.SUPPLIERS,
				icon: <BoxIcon />
			}
		]
	}
];
