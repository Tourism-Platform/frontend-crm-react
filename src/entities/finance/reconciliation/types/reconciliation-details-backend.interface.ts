import type { BookingStatus } from "@/shared/api/generated/Api";
import type { TFileMetadata } from "@/shared/hooks";

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

export interface IReconciliationDetailBackend {
	booking_id: string;
	order_number: string;
	client_name: string;
	planned_revenue: number;
	revenue_accrued: number;
	planned_cost: number;
	cost_accrued: number;
	variance: number;
	status: BookingStatus;
	currency: string;
	planned_margin: number;
	actual_margin: number;
	supplier_payments: IReconciliationSupplierPaymentBackend[];
}
