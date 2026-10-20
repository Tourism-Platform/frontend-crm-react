import type { TOptionsKeys } from "@/shared/config";

import { ENUM_TOUR_LIST_SORT, type ENUM_TOUR_LIST_SORT_TYPE } from "../types";

export const TOUR_LIST_SORT_LABELS: Record<
	ENUM_TOUR_LIST_SORT_TYPE,
	TOptionsKeys
> = {
	[ENUM_TOUR_LIST_SORT.CREATED_DESC]: "tour.listSort.created_desc",
	[ENUM_TOUR_LIST_SORT.CREATED_ASC]: "tour.listSort.created_asc",
	[ENUM_TOUR_LIST_SORT.TITLE_ASC]: "tour.listSort.title_asc",
	[ENUM_TOUR_LIST_SORT.TITLE_DESC]: "tour.listSort.title_desc",
	[ENUM_TOUR_LIST_SORT.STATUS_ASC]: "tour.listSort.status_asc",
	[ENUM_TOUR_LIST_SORT.GROUP_SIZE_ASC]: "tour.listSort.group_size_asc",
	[ENUM_TOUR_LIST_SORT.GROUP_SIZE_DESC]: "tour.listSort.group_size_desc"
};
