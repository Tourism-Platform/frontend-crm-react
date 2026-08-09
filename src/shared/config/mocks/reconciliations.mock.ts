import { ENUM_ORDER_STATUS } from "@/entities/booking/order/types/order-status.types";
import type { IReconciliation } from "@/entities/finance";

export const RECONCILIATIONS_MOCK: IReconciliation[] = [
	{
		bookingId: "b3000001-0000-4000-8000-000000000001",
		orderId: "RQA00001",
		client: "Danda (Tour agency)",
		plannedRevenue: 12000.0,
		plannedCost: 10000.0,
		plannedProfit: 2000.0,
		revenueAccrued: 7000.0,
		revenueSettled: 5000.0,
		receivable: 2000.0,
		costAccrued: 4200.0,
		costSettled: 3000.0,
		payable: 1200.0,
		accrualProfit: 2800.0,
		settledProfit: 2000.0,
		variance: -800.0,
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		currency: "USD"
	},
	{
		bookingId: "b3000002-0000-4000-8000-000000000001",
		orderId: "RQA00002",
		client: "Danda (Tour agency)",
		plannedRevenue: 14000.0,
		plannedCost: 7800.0,
		plannedProfit: 6200.0,
		revenueAccrued: 9000.0,
		revenueSettled: 9000.0,
		receivable: 0,
		costAccrued: 7300.0,
		costSettled: 7300.0,
		payable: 0,
		accrualProfit: 1700.0,
		settledProfit: 1700.0,
		variance: 500.0,
		status: ENUM_ORDER_STATUS.COMPLETED,
		currency: "USD"
	}
];
