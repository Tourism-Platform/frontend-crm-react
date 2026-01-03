import { type ENUM_ORDER_STATUS_TYPE } from "./order-status.types";

export interface IBookingOrderFilters {
	status: ENUM_ORDER_STATUS_TYPE[];
	search: string;
	page: number;
	limit: number;
}
