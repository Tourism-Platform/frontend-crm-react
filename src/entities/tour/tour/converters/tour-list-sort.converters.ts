import { TourListSortField } from "@/shared/api";

import { ENUM_TOUR_LIST_SORT, type ENUM_TOUR_LIST_SORT_TYPE } from "../types";

/** Значение селекта сортировки → `sort_by` + `desc` бэкенда */
export const MAP_TOUR_LIST_SORT: Record<
	ENUM_TOUR_LIST_SORT_TYPE,
	{ sort_by: TourListSortField; desc: boolean }
> = {
	[ENUM_TOUR_LIST_SORT.CREATED_DESC]: {
		sort_by: TourListSortField.CreatedAt,
		desc: true
	},
	[ENUM_TOUR_LIST_SORT.CREATED_ASC]: {
		sort_by: TourListSortField.CreatedAt,
		desc: false
	},
	[ENUM_TOUR_LIST_SORT.TITLE_ASC]: {
		sort_by: TourListSortField.Title,
		desc: false
	},
	[ENUM_TOUR_LIST_SORT.TITLE_DESC]: {
		sort_by: TourListSortField.Title,
		desc: true
	},
	[ENUM_TOUR_LIST_SORT.STATUS_ASC]: {
		sort_by: TourListSortField.Status,
		desc: false
	},
	[ENUM_TOUR_LIST_SORT.GROUP_SIZE_ASC]: {
		sort_by: TourListSortField.GroupSize,
		desc: false
	},
	[ENUM_TOUR_LIST_SORT.GROUP_SIZE_DESC]: {
		sort_by: TourListSortField.GroupSize,
		desc: true
	}
};
