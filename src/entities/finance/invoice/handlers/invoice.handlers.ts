import { HttpResponse } from "msw";

import { INVOICE_PATHS, createMockHandler } from "@/shared/api";

import { getInvoiceDetail, listInvoicesFromUrl } from "../mock/invoice.store";

export const financeInvoiceHandlers = [
	createMockHandler(INVOICE_PATHS.listMyInvoices, async ({ request }) =>
		HttpResponse.json(listInvoicesFromUrl(new URL(request.url)))
	),
	createMockHandler(
		{
			url: "/invoice/:invoiceId",
			method: "GET"
		},
		async ({ params }) => {
			const detail = getInvoiceDetail(String(params.invoiceId));

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(detail);
		}
	),
	createMockHandler(
		{
			url: "/invoice/:invoiceId/pdf",
			method: "GET"
		},
		async ({ params }) => {
			const detail = getInvoiceDetail(String(params.invoiceId));

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json({
				url: `https://example.com/invoices/${detail.invoice_number}.pdf`
			});
		}
	)
];
