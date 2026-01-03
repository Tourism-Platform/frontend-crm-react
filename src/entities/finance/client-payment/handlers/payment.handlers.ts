import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { PAYMENTS_MOCK } from "../mock";
import {
	ENUM_PAYMENT_STATUS,
	type IPaymentBackend,
	type IPaymentPaginatedResponseBackend,
	type TPaymentStatusCounts
} from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

let payments = [...PAYMENTS_MOCK];

export const financeClientPaymentHandlers = [
	http.get(
		`${BASE_URL}/finance/client-payments`,
		async ({
			request
		}): Promise<HttpResponse<IPaymentPaginatedResponseBackend>> => {
			await delay(500);
			const url = new URL(request.url);
			const page = Number(url.searchParams.get("page")) || 1;
			const limit = Number(url.searchParams.get("limit")) || 10;
			const search = url.searchParams.get("search");
			const status = url.searchParams
				.get("status")
				?.split(",")
				.filter(Boolean);

			const statusCounts = payments.reduce(
				(acc: Record<string, number>, current) => {
					acc[current.status] = (acc[current.status] || 0) + 1;
					return acc;
				},
				Object.values(ENUM_PAYMENT_STATUS).reduce(
					(acc: Record<string, number>, status) => {
						acc[status] = 0;
						return acc;
					},
					{} as Record<string, number>
				)
			) as TPaymentStatusCounts;

			let filteredPayments = [...payments];

			if (search) {
				const query = search.toLowerCase();
				filteredPayments = filteredPayments.filter(
					(p) =>
						p.payment_id.toLowerCase().includes(query) ||
						p.order_id.toLowerCase().includes(query)
				);
			}

			if (status && status.length > 0) {
				filteredPayments = filteredPayments.filter(
					(p) => status && status.includes(p.status)
				);
			}

			const start = (page - 1) * limit;
			const end = start + limit;
			const pagedData = filteredPayments.slice(start, end);

			return HttpResponse.json(
				{
					data: pagedData,
					total: filteredPayments.length,
					status_counts: statusCounts
				},
				{ status: 200 }
			);
		}
	),

	http.post(`${BASE_URL}/finance/client-payments`, async ({ request }) => {
		await delay(500);
		const body = (await request.json()) as Partial<IPaymentBackend>;

		const newPayment: IPaymentBackend = {
			...body,
			id: (payments.length + 1).toString(),
			payment_id:
				body.payment_id || `INV-${Math.floor(Math.random() * 10000)}`,
			order_id: body.order_id || "",
			date_created: new Date().toISOString(),
			amount: body.amount || 0,
			currency: body.currency || "USD",
			status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED
		} as IPaymentBackend;

		payments.push(newPayment);

		return HttpResponse.json(newPayment, { status: 201 });
	}),

	http.patch(
		`${BASE_URL}/finance/client-payments/:id`,
		async ({ request, params }) => {
			await delay(500);
			const { id } = params;
			const body = (await request.json()) as Partial<IPaymentBackend>;
			const index = payments.findIndex((p) => p.id === id);

			if (index !== -1) {
				const status = body.order_id
					? ENUM_PAYMENT_STATUS.ASSIGNED
					: body.status || payments[index].status;

				payments[index] = { ...payments[index], ...body, status };
				return HttpResponse.json(payments[index], { status: 200 });
			}

			return new HttpResponse(null, { status: 404 });
		}
	),

	http.delete(
		`${BASE_URL}/finance/client-payments/:id`,
		async ({ params }) => {
			await delay(500);
			const { id } = params;
			payments = payments.filter((p) => p.id !== id);
			return new HttpResponse(null, { status: 204 });
		}
	)
];
