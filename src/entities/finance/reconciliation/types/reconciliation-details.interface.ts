import { type IReconciliationBackend } from "./reconciliation-backend.interface";
import { type IReconciliation } from "./reconciliation.interface";

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

export interface IReconciliationDetailBackend extends IReconciliationBackend {
	planned_margin: number;
	actual_margin: number;
	supplier_payments: {
		id: string;
		component: string;
		planned_amount: number;
		actual_amount: number;
		variance: number;
	}[];
}
