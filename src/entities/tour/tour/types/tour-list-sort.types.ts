export const ENUM_TOUR_LIST_SORT = {
	CREATED_DESC: "created_at_desc",
	CREATED_ASC: "created_at_asc",
	TITLE_ASC: "title_asc",
	TITLE_DESC: "title_desc",
	STATUS_ASC: "status_asc",
	GROUP_SIZE_ASC: "group_size_asc",
	GROUP_SIZE_DESC: "group_size_desc"
} as const;

export type ENUM_TOUR_LIST_SORT_TYPE =
	(typeof ENUM_TOUR_LIST_SORT)[keyof typeof ENUM_TOUR_LIST_SORT];

export const ENUM_TOUR_FILTER = {
	SORT: "sort",
	TYPE: "type"
} as const;

export type ENUM_TOUR_FILTER_TYPE =
	(typeof ENUM_TOUR_FILTER)[keyof typeof ENUM_TOUR_FILTER];
