import type { TFileMetadata } from "@/shared/hooks";

import { type IReconciliationBackend } from "./reconciliation-backend.interface";

export interface IReconciliationSupplierPaymentBackend {
	id: string;
	order_id: string;
	component: string;
	planned_amount: number;
	actual_amount: number;
	variance: number;
	note?: string;
	files?: TFileMetadata[];
}

export interface IReconciliationDetailBackend extends IReconciliationBackend {
	planned_margin: number;
	actual_margin: number;
	supplier_payments: IReconciliationSupplierPaymentBackend[];
}
