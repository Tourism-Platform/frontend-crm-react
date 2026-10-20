import type { ENUM_ORDER_STATUS_TYPE } from "@/entities/booking/order/types/order-status.types";

export const ENUM_RECONCILIATION_FILTER = {
	TOUR_ID: "tourId",
	DATE_RANGE: "dateRange",
	OUTSTANDING_ONLY: "outstandingOnly",
	PAYABLE_ONLY: "payableOnly"
} as const;

export type ENUM_RECONCILIATION_FILTER_TYPE =
	(typeof ENUM_RECONCILIATION_FILTER)[keyof typeof ENUM_RECONCILIATION_FILTER];

export interface IReconciliationFilters {
	search: string;
	status: ENUM_ORDER_STATUS_TYPE[];
	page: number;
	limit: number;
	tourId?: string;
	dateRange?: { from?: Date; to?: Date };
	outstandingOnly?: boolean;
	payableOnly?: boolean;
}
