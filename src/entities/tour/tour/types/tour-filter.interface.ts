import type { ENUM_TOUR_LIST_SORT_TYPE } from "./tour-list-sort.types";
import type { ENUM_TOUR_STATUS_TYPE } from "./tour-status.types";
import type { ENUM_TOUR_TYPES_TYPE } from "./tour-type.types";
import type { ITourCard } from "./tour.interface";

export interface ITourFilters {
	search: string;
	status: ENUM_TOUR_STATUS_TYPE[];
	page: number;
	limit: number;
	sort?: ENUM_TOUR_LIST_SORT_TYPE;
	type?: ENUM_TOUR_TYPES_TYPE;
}

export type TTourSelectOption = {
	label: string;
	value: string;
} & ITourCard;
