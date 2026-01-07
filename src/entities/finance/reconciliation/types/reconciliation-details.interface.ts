import type { TFileMetadata } from "@/shared/hooks";

import { type IReconciliation } from "./reconciliation.interface";

export interface IReconciliationSupplierPayment {
	id: string;
	component: string;
	plannedAmount: number;
	actualAmount: number;
	variance: number;
	orderId: string;
	note?: string;
	files?: TFileMetadata[];
}

export interface IReconciliationDetail extends IReconciliation {
	plannedMargin: number;
	actualMargin: number;
	supplierPayments: IReconciliationSupplierPayment[];
}
