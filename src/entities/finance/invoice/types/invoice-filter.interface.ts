import type { ENUM_INVOICE_STATUS_TYPE } from "./invoice-status.types";

export interface IInvoiceFilters {
	search: string;
	status: ENUM_INVOICE_STATUS_TYPE[];
	page: number;
	limit: number;
}
