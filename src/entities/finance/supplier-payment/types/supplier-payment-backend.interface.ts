import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment-status.types";
import type { TSupplierPaymentStatusCounts } from "./supplier-payment.interface";

export interface ISupplierPaymentBackend {
	id: string;
	order_id: string;
	component: string;
	type: string;
	supplier: string;
	date_created: string;
	amount: number;
	currency: string;
	manager: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
}

export interface ISupplierPaymentPaginatedResponseBackend
	extends IPaginationResponse<ISupplierPaymentBackend> {
	status_counts: TSupplierPaymentStatusCounts;
}
