import { type IPaginationResponse } from "@/shared/types";

import { type ENUM_TOUR_ORDER_STATUS_TYPE } from "./order-status.types";

export interface ITourOrderBackend {
	order_id: string;
	client: string;
	type: string;
	pax: number;
	date_from: string;
	date_to: string;
	status: ENUM_TOUR_ORDER_STATUS_TYPE;
}

export type TTourOrderPaginatedResponseBackend =
	IPaginationResponse<ITourOrderBackend>;
