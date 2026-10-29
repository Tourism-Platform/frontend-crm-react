import { HttpResponse } from "msw";

import {
	INVOICE_PATHS,
	createMockHandler,
	mockNotFound,
	readFormFiles
} from "@/shared/api";

import {
	generateInvoiceInStore,
	getInvoiceDetail,
	getInvoicePdfUrl,
	listInvoicesFromUrl,
	recordInvoicePaymentInStore,
	uploadInvoicePdfInStore
} from "../mock/invoice.store";
import type {
	TInvoiceGenerateBackend,
	TInvoicePaymentCreateBackend
} from "../types";

export const financeInvoiceHandlers = [
	createMockHandler(INVOICE_PATHS.listMyInvoices, async ({ request }) =>
		HttpResponse.json(listInvoicesFromUrl(new URL(request.url)))
	),
	createMockHandler(INVOICE_PATHS.generateInvoice, async ({ body }) => {
		const created = generateInvoiceInStore(body as TInvoiceGenerateBackend);

		if (!created) {
			return mockNotFound("Booking not found");
		}

		return HttpResponse.json(created, { status: 201 });
	}),
	createMockHandler(
		INVOICE_PATHS.getInvoice(":invoiceId"),
		async ({ params }) => {
			const detail = getInvoiceDetail(String(params.invoiceId));

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(detail);
		}
	),
	createMockHandler(
		INVOICE_PATHS.getInvoicePdf(":invoiceId"),
		async ({ params }) => {
			const detail = getInvoiceDetail(String(params.invoiceId));

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json({ url: getInvoicePdfUrl(detail) });
		}
	),
	createMockHandler(
		INVOICE_PATHS.uploadInvoicePdf(":invoiceId"),
		async ({ params, request }) => {
			const [file] = await readFormFiles(request);
			const updated = uploadInvoicePdfInStore(
				String(params.invoiceId),
				file?.name || "invoice.pdf"
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		INVOICE_PATHS.recordInvoicePayment(":invoiceId"),
		async ({ params, body }) => {
			const updated = recordInvoicePaymentInStore(
				String(params.invoiceId),
				Number((body as TInvoicePaymentCreateBackend).amount)
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	)
];
