import type { ENUM_TOUR_STATUS_TYPE } from "../constants";

export interface ITourFilters {
	search: string;
	status: ENUM_TOUR_STATUS_TYPE[];
	page: number;
	limit: number;
}
