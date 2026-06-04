import { HttpResponse } from "msw";

import {
	CLIENT_PAYMENT_PATHS,
	type ClientPaymentUpdate,
	createMockHandler
} from "@/shared/api";

import {
	confirmPaymentInStore,
	createPaymentFromFormData,
	deletePaymentFromStore,
	getPayment,
	listAvailableBookingIds,
	listPaymentsFromUrl,
	updatePaymentInStore
} from "../mock/payment.store";

export const financeClientPaymentHandlers = [
	createMockHandler(
		{ url: "/finance/client-payments/available-orders", method: "GET" },
		async () => HttpResponse.json(listAvailableBookingIds())
	),
	createMockHandler(CLIENT_PAYMENT_PATHS.listPayments, async ({ request }) =>
		HttpResponse.json(listPaymentsFromUrl(new URL(request.url)))
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.createPayment,
		async ({ request }) => {
			const formData = await request.formData();
			const created = createPaymentFromFormData(formData);

			if (!created) {
				return new HttpResponse(null, { status: 400 });
			}

			return HttpResponse.json(created, { status: 201 });
		}
	),
	createMockHandler(
		{ url: "/booking/payment/:paymentId", method: "GET" },
		async ({ params }) => {
			const payment = getPayment(String(params.paymentId));

			if (!payment) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(payment);
		}
	),
	createMockHandler(
		{ url: "/booking/payment/:paymentId", method: "PATCH" },
		async ({ params, body }) => {
			const updated = updatePaymentInStore(
				String(params.paymentId),
				body as ClientPaymentUpdate
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		{ url: "/booking/payment/:paymentId/confirm", method: "POST" },
		async ({ params }) => {
			const updated = confirmPaymentInStore(String(params.paymentId));

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		{ url: "/booking/payment/:paymentId/attachment", method: "GET" },
		async ({ params }) => {
			const payment = getPayment(String(params.paymentId));

			if (!payment?.has_attachment) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(
				`https://example.com/payments/${payment.id}.pdf`
			);
		}
	),
	createMockHandler(
		{ url: "/booking/payment/:paymentId", method: "DELETE" },
		async ({ params }) => {
			const deleted = deletePaymentFromStore(String(params.paymentId));

			if (!deleted) {
				return new HttpResponse(null, { status: 404 });
			}

			return new HttpResponse(null, { status: 204 });
		}
	)
];
