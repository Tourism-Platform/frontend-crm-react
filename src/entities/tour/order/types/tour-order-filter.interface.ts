import { type ENUM_TOUR_ORDER_STATUS_TYPE } from "../../types";

export interface ITourOrderFilters {
	tourId: string;
	status: ENUM_TOUR_ORDER_STATUS_TYPE[];
	search: string;
	page: number;
	limit: number;
}
