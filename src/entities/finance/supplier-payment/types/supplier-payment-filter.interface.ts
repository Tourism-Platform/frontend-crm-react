import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment-status.types";

export const ENUM_SUPPLIER_PAYMENT_FILTER = {
	SUPPLIER_ID: "supplierId"
} as const;

export interface ISupplierPaymentFilters {
	bookingId?: string;
	search: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE[];
	page: number;
	limit: number;
	supplierId?: string;
}
