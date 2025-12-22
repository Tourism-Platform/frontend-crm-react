import { type TReconciliationPageKeys } from "@/shared/config/i18n/i18n.config";

export const ENUM_RECONCILIATION_STATUS = {
	IN_PROGRESS: "in_progress",
	COMPLETED: "completed"
} as const;

export type ENUM_RECONCILIATION_STATUS_TYPE =
	(typeof ENUM_RECONCILIATION_STATUS)[keyof typeof ENUM_RECONCILIATION_STATUS];

export interface IReconciliation {
	id: string;
	orderId: string;
	client: string;
	plannedRevenue: number;
	actualRevenue: number;
	plannedCost: number;
	actualCost: number;
	variance: number;
	status: ENUM_RECONCILIATION_STATUS_TYPE;
	currency: string;
}

export interface IReconciliationSupplierPayment {
	id: string;
	component: string;
	plannedAmount: number;
	actualAmount: number;
	variance: number;
}

export interface IReconciliationDetail extends IReconciliation {
	plannedMargin: number;
	actualMargin: number;
	supplierPayments: IReconciliationSupplierPayment[];
}

export const RECONCILIATION_STATUS_LABELS: Record<
	ENUM_RECONCILIATION_STATUS_TYPE,
	TReconciliationPageKeys
> = {
	[ENUM_RECONCILIATION_STATUS.IN_PROGRESS]: "table.statuses.in_progress",
	[ENUM_RECONCILIATION_STATUS.COMPLETED]: "table.statuses.completed"
};
