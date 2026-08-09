import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_ORDER_STATUS_TYPE } from "@/entities/booking/order/types/order-status.types";

export interface IReconciliationTotals {
	revenueAccrued: number;
	revenueSettled: number;
	receivable: number;
	costAccrued: number;
	costSettled: number;
	payable: number;
	settledProfit: number;
	accrualProfit: number;
}

export interface IReconciliation {
	bookingId: string;
	orderId: string;
	client: string;
	currency: string;
	plannedRevenue: number;
	plannedCost: number;
	plannedProfit: number;
	revenueAccrued: number;
	revenueSettled: number;
	receivable: number;
	costAccrued: number;
	costSettled: number;
	payable: number;
	accrualProfit: number;
	settledProfit: number;
	variance: number;
	status: ENUM_ORDER_STATUS_TYPE;
}

export interface IReconciliationPaginatedResponse
	extends IPaginationResponse<IReconciliation> {
	totals: IReconciliationTotals;
	currency: string;
}
