import type {
	InvoiceDetailResponse,
	InvoiceGenerate,
	InvoiceListItem,
	InvoiceListResponse,
	InvoicePaymentCreate,
	InvoicePdfResponse
} from "@/shared/api";

export interface IGenerateInvoiceDocumentBackend {
	documentId: string;
}
export type TInvoiceDetailResponseBackend = InvoiceDetailResponse;
export type TInvoiceListResponseBackend = InvoiceListResponse;
export type TInvoicePdfResponseBackend = InvoicePdfResponse;
export type TInvoiceListItemBackend = InvoiceListItem;
export type TInvoiceGenerateBackend = InvoiceGenerate;
export type TInvoicePaymentCreateBackend = InvoicePaymentCreate;
