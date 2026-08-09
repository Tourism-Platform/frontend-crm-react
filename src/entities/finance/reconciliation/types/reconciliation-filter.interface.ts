import type { ENUM_ORDER_STATUS_TYPE } from "@/entities/booking/order/types/order-status.types";

export interface IReconciliationFilters {
	search: string;
	status: ENUM_ORDER_STATUS_TYPE[];
	page: number;
	limit: number;
}
