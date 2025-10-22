import { ENUM_PATH } from "@/shared/config";

import type { TBreadcrumbList } from "./types";

export const BREADCRUMB_LIST: TBreadcrumbList = {
	[ENUM_PATH.TOURS.EVENTS.ROOT]: "breadcrumb.itinerary",
	[ENUM_PATH.TOURS.EVENTS.FLIGHT]: "breadcrumb.events.flight",
	[ENUM_PATH.TOURS.EVENTS.EVENT]: "breadcrumb.events.activity",
	[ENUM_PATH.TOURS.EVENTS.TRANSFER]: "breadcrumb.events.transportation",
	[ENUM_PATH.TOURS.EVENTS.ACCOMMODATION]: "breadcrumb.events.accommodation",
	[ENUM_PATH.TOURS.EVENTS.MULTIPLY_OPTION]:
		"breadcrumb.events.multiply_option",
	[ENUM_PATH.TOURS.EVENTS.TOUR_DETAILS]: "breadcrumb.events.tour_details",
	[ENUM_PATH.TOURS.EVENTS.INFO]: "breadcrumb.events.info"
};
