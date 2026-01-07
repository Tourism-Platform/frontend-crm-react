import { type IPaginationResponse } from "@/shared/types";

import { type ENUM_TOUR_ORDER_STATUS_TYPE } from "./order-status.types";

export interface ITourOrderDates {
	from: string;
	to: string;
}

export interface ITourOrder {
	orderId: string;
	client: string;
	type: string;
	pax: number;
	dates: ITourOrderDates;
	status: ENUM_TOUR_ORDER_STATUS_TYPE;
}

export type TTourOrderPaginatedResponse = IPaginationResponse<ITourOrder>;
