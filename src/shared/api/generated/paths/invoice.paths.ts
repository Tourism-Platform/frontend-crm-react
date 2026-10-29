import type {
	BodyUploadInvoicePdfInvoiceInvoiceIdPdfPost,
	InvoiceDetailResponse,
	InvoiceGenerate,
	InvoiceListResponse,
	InvoicePaymentCreate,
	InvoicePdfResponse,
	InvoiceStatus
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const INVOICE_PATHS = {
	listMyInvoices: {
		url: "/invoice",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				statuses?: InvoiceStatus[] | null;
				q?: string | null;
				skip?: number;
				limit?: number;
			};
			response: InvoiceListResponse;
		}
	} as const,
	generateInvoice: {
		url: "/invoice",
		method: "POST",
		_types: {} as {
			body: InvoiceGenerate;
			query: void;
			response: InvoiceDetailResponse;
		}
	} as const,
	getInvoice: (invoiceId: string) =>
		({
			url: `/invoice/${invoiceId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: InvoiceDetailResponse;
			}
		}) as const,
	getInvoicePdf: (invoiceId: string) =>
		({
			url: `/invoice/${invoiceId}/pdf`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: InvoicePdfResponse;
			}
		}) as const,
	uploadInvoicePdf: (invoiceId: string) =>
		({
			url: `/invoice/${invoiceId}/pdf`,
			method: "POST",
			_types: {} as {
				body: BodyUploadInvoicePdfInvoiceInvoiceIdPdfPost;
				query: void;
				response: InvoiceDetailResponse;
			}
		}) as const,
	recordInvoicePayment: (invoiceId: string) =>
		({
			url: `/invoice/${invoiceId}/payment`,
			method: "POST",
			_types: {} as {
				body: InvoicePaymentCreate;
				query: void;
				response: InvoiceDetailResponse;
			}
		}) as const
} as const;
