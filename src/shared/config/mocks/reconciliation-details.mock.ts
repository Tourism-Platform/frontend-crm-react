import type { IReconciliationDetail } from "@/entities/finance/reconciliation/types/reconciliation.types";

export const RECONCILIATION_DETAILS_MOCK: Record<
	string,
	IReconciliationDetail
> = {
	"1": {
		id: "1",
		orderId: "RQA00001",
		client: "Danda (tour agency)",
		plannedRevenue: 12000.0,
		actualRevenue: 7000.0,
		plannedCost: 10000.0,
		actualCost: 4200.0,
		plannedMargin: 2000.0,
		actualMargin: 2800.0,
		variance: 800.0,
		status: "in_progress",
		currency: "USD",
		supplierPayments: [
			{
				id: "1",
				component: "Flight from London to Tashkent",
				plannedAmount: 2000.0,
				actualAmount: 2100.0,
				variance: -100.0
			},
			{
				id: "2",
				component: "Hilton Hotel",
				plannedAmount: 5600.0,
				actualAmount: 0.0,
				variance: 0.0
			},
			{
				id: "3",
				component: "Meals",
				plannedAmount: 2400.0,
				actualAmount: 2100.0,
				variance: 300.0
			}
		]
	}
};
