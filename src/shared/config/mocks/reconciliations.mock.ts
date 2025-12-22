import type { IReconciliation } from "@/entities/finance";

export const RECONCILIATIONS_MOCK: IReconciliation[] = [
	{
		id: "1",
		orderId: "RQA00001",
		client: "Danda (Tour agency)",
		plannedRevenue: 12000.0,
		actualRevenue: 7000.0,
		plannedCost: 10000.0,
		actualCost: 4200.0,
		variance: -800.0,
		status: "in_progress",
		currency: "USD"
	},
	{
		id: "2",
		orderId: "RQA00002",
		client: "Danda (Tour agency)",
		plannedRevenue: 14000.0,
		actualRevenue: 9000.0,
		plannedCost: 7800.0,
		actualCost: 7300.0,
		variance: 500.0,
		status: "completed",
		currency: "USD"
	}
];
