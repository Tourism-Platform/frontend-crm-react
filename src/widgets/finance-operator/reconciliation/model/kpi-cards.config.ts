import type { IReconciliationKpiCard } from "./types";

export const RECONCILIATION_KPI_CARDS = [
	{
		primaryKey: "receivable",
		secondary: ["revenueAccrued", "revenueSettled"]
	},
	{
		primaryKey: "payable",
		secondary: ["costAccrued", "costSettled"]
	},
	{
		primaryKey: "settledProfit",
		secondary: ["accrualProfit"]
		// tone: "profit"
	}
] satisfies readonly IReconciliationKpiCard[];
