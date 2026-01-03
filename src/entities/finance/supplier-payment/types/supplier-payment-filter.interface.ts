import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment-status.types";

export interface ISupplierPaymentFilters {
	search: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE[];
	page: number;
	limit: number;
}
