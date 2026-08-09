import type { TFileMetadata } from "@/shared/hooks";

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

export interface IReconciliationDetail {
	id: string;
	orderId: string;
	client: string;
	plannedRevenue: number;
	actualRevenue: number;
	plannedCost: number;
	actualCost: number;
	variance: number;
	currency: string;
	plannedMargin: number;
	actualMargin: number;
	supplierPayments: IReconciliationSupplierPayment[];
}
