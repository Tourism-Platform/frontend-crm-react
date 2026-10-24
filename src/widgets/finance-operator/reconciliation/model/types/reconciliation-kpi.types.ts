import type { IReconciliationTotals } from "@/entities/finance";

export type TReconciliationTotalKey = keyof IReconciliationTotals;

export interface IReconciliationKpiCard {
	primaryKey: TReconciliationTotalKey;
	secondary: readonly TReconciliationTotalKey[];
}
