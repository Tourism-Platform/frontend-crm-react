import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { INVOICE_DETAILS_MAP, INVOICE_LIST_MOCK } from "../mock";
import { ENUM_INVOICE_STATUS } from "../types";
import type {
	IInvoicePaginatedResponseBackend,
	TInvoiceStatusCounts
} from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const financeInvoiceHandlers = [
	http.get(
		`${BASE_URL}/finance/invoices`,
		async ({
			request
		}): Promise<HttpResponse<IInvoicePaginatedResponseBackend>> => {
			await delay(500);
			const url = new URL(request.url);
			const page = Number(url.searchParams.get("page")) || 1;
			const limit = Number(url.searchParams.get("limit")) || 10;
			const search = url.searchParams.get("search");
			const status = url.searchParams
				.get("status")
				?.split(",")
				.filter(Boolean);

			const statusCounts = INVOICE_LIST_MOCK.reduce(
				(acc: Record<string, number>, current) => {
					acc[current.status] = (acc[current.status] || 0) + 1;
					return acc;
				},
				Object.values(ENUM_INVOICE_STATUS).reduce(
					(acc: Record<string, number>, status) => {
						acc[status] = 0;
						return acc;
					},
					{} as Record<string, number>
				)
			) as TInvoiceStatusCounts;

			let filteredInvoices = [...INVOICE_LIST_MOCK];

			if (search) {
				const query = search.toLowerCase();
				filteredInvoices = filteredInvoices.filter(
					(i) =>
						i.payment_id.toLowerCase().includes(query) ||
						i.order_id.toLowerCase().includes(query)
				);
			}

			if (status && status.length > 0) {
				filteredInvoices = filteredInvoices.filter(
					(i) => status && status.includes(i.status)
				);
			}

			const start = (page - 1) * limit;
			const end = start + limit;
			const pagedData = filteredInvoices.slice(start, end);

			return HttpResponse.json(
				{
					data: pagedData,
					total: filteredInvoices.length,
					status_counts: statusCounts
				},
				{ status: 200 }
			);
		}
	),

	http.get(`${BASE_URL}/finance/invoices/:id`, async ({ params }) => {
		await delay(500);
		const { id } = params;
		const invoice = INVOICE_DETAILS_MAP[id as string];

		if (invoice) {
			return HttpResponse.json(invoice, { status: 200 });
		}

		return new HttpResponse(null, { status: 404 });
	})
];
