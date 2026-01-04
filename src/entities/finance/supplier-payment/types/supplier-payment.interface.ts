import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment-status.types";

export interface ISupplierPayment {
	id: string;
	orderId: string;
	component: string;
	type: string;
	supplier: string;
	dateCreated: string;
	amount: number;
	currency: string;
	manager: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
}

export type TSupplierPaymentStatusCounts = Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	number
>;

export interface ISupplierPaymentPaginatedResponse
	extends IPaginationResponse<ISupplierPayment> {
	statusCounts: TSupplierPaymentStatusCounts;
}

export interface IOrderSupplierPaymentItem {
	id: string;
	item: string;
	supplierPayment: number | string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
}
