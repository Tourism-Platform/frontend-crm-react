import type { ENUM_RECONCILIATION_STATUS_TYPE } from "./reconciliation.types";

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
