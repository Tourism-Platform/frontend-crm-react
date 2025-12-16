import { ENUM_TOUR_STATUS, type ITourTabs } from "../types";

export const TOUR_TABS_LIST: ITourTabs[] = [
	{
		label: "tabs.all",
		value: ENUM_TOUR_STATUS.ALL
	},
	{
		label: "tabs.active",
		value: ENUM_TOUR_STATUS.ACTIVE
	},
	{
		label: "tabs.moderate",
		value: ENUM_TOUR_STATUS.MODERATE
	},
	{
		label: "tabs.planning",
		value: ENUM_TOUR_STATUS.PLANNING
	},
	{
		label: "tabs.cancelled",
		value: ENUM_TOUR_STATUS.CANCELLED
	},
	{
		label: "tabs.archived",
		value: ENUM_TOUR_STATUS.ARCHIVED
	}
];
