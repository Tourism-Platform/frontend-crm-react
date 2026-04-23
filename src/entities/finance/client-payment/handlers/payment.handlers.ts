import { HttpResponse } from "msw";

import {
	CLIENT_PAYMENT_PATHS,
	ClientPaymentStatus,
	CurrencyCode
} from "@/shared/api";
import { createMockHandler } from "@/shared/api/msw/utils";

import { PAYMENTS_MOCK } from "../mock";
import { type TPaymentBackend, type TPaymentBackendResponse } from "../types";

let payments = [...PAYMENTS_MOCK.data];

export const financeClientPaymentHandlers = [
	// GET available orders
	createMockHandler(
		{ url: "/finance/client-payments/available-orders", method: "GET" },
		async () => {
			const availableOrders: string[] = [
				"ORD-12345",
				"ORD-12346",
				"ORD-12347",
				"ORD-12348",
				"ORD-12349"
			];
			return HttpResponse.json(availableOrders, { status: 200 });
		}
	),

	// GET list of payments
	createMockHandler(
		CLIENT_PAYMENT_PATHS.listPayments,
		async ({ request }): Promise<HttpResponse<TPaymentBackendResponse>> => {
			const url = new URL(request.url);
			const skip = Number(url.searchParams.get("skip")) || 0;
			const limit = Number(url.searchParams.get("limit")) || 10;
			const status = url.searchParams.get("status");
			const bookingId = url.searchParams.get("booking_id");

			let filteredPayments = [...payments];

			if (status && status !== "null" && status !== "undefined") {
				filteredPayments = filteredPayments.filter(
					(p) => p.status === status
				);
			}

			if (
				bookingId &&
				bookingId !== "null" &&
				bookingId !== "undefined"
			) {
				filteredPayments = filteredPayments.filter(
					(p) => p.booking_id === bookingId
				);
			}

			const pagedData = filteredPayments.slice(skip, skip + limit);

			return HttpResponse.json(
				{
					data: pagedData,
					total_count: filteredPayments.length
				},
				{ status: 200 }
			);
		}
	),

	// POST create payment
	createMockHandler(
		CLIENT_PAYMENT_PATHS.createPayment,
		async ({ request }) => {
			const formData = await request.formData();

			const bookingId = formData.get("booking_id") as string;
			const amountUzs = Number(formData.get("amount_uzs"));
			const exchangeRate = Number(formData.get("exchange_rate"));
			const note = formData.get("note") as string | null;
			const file = formData.get("file");

			const newPayment: TPaymentBackend = {
				id: Math.random().toString(36).substring(7),
				booking_id: bookingId,
				operator_id: "op-current",
				amount: amountUzs / exchangeRate,
				currency: CurrencyCode.USD,
				status: ClientPaymentStatus.NotConfirmed,
				note: note,
				has_attachment: !!file,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString()
			};

			payments.unshift(newPayment);

			return HttpResponse.json(newPayment, { status: 201 });
		}
	),

	// PATCH update payment
	createMockHandler(
		CLIENT_PAYMENT_PATHS.updatePayment(":id"),
		async ({ body, params }) => {
			const { id } = params;
			const index = payments.findIndex((p) => p.id === id);

			if (index !== -1) {
				payments[index] = {
					...payments[index],
					...(body as Partial<TPaymentBackend>),
					updated_at: new Date().toISOString()
				};
				return HttpResponse.json(payments[index], { status: 200 });
			}
			return new HttpResponse(null, { status: 404 });
		}
	),

	// POST confirm payment
	createMockHandler(
		CLIENT_PAYMENT_PATHS.confirmPayment(":id"),
		async ({ params }) => {
			const { id } = params;
			const index = payments.findIndex((p) => p.id === id);

			if (index !== -1) {
				payments[index] = {
					...payments[index],
					status: ClientPaymentStatus.Confirmed,
					updated_at: new Date().toISOString()
				};
				return HttpResponse.json(payments[index], { status: 200 });
			}
			return new HttpResponse(null, { status: 404 });
		}
	),

	// GET payment by ID
	createMockHandler(
		CLIENT_PAYMENT_PATHS.getPayment(":id"),
		async ({ params }) => {
			const { id } = params;
			const payment = payments.find((p) => p.id === id);
			if (payment) {
				return HttpResponse.json(payment, { status: 200 });
			}
			return new HttpResponse(null, { status: 404 });
		}
	),

	// GET download attachment
	createMockHandler(
		CLIENT_PAYMENT_PATHS.downloadAttachment(":id"),
		async () => {
			return HttpResponse.json("https://example.com/mock-file.pdf", {
				status: 200
			});
		}
	),

	// DELETE payment
	createMockHandler(
		CLIENT_PAYMENT_PATHS.deletePayment(":id"),
		async ({ params }) => {
			const { id } = params;
			payments = payments.filter((p) => p.id !== id);
			return new HttpResponse(null, { status: 204 });
		}
	)
];
