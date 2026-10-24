import type {
	InvoiceDetailResponse,
	InvoiceListItem,
	InvoiceListResponse,
	InvoicePdfResponse
} from "@/shared/api";

export interface IGenerateInvoiceDocumentBackend {
	documentId: string;
}
export type TInvoiceDetailResponseBackend = InvoiceDetailResponse;
export type TInvoiceListResponseBackend = InvoiceListResponse;
export type TInvoicePdfResponseBackend = InvoicePdfResponse;
export type TInvoiceListItemBackend = InvoiceListItem;
