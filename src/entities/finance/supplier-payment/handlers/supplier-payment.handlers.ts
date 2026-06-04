import { HttpResponse } from "msw";

import {
	OPERATOR_SUPPLIER_PAYMENT_PATHS,
	type SupplierPaymentUpdate,
	createMockHandler
} from "@/shared/api";

import {
	getSupplierPayment,
	listSupplierPaymentsFromUrl,
	updateSupplierPaymentInStore,
	uploadReceiptInStore
} from "../mock/supplier-payment.store";

export const financeSupplierPaymentHandlers = [
	createMockHandler(
		OPERATOR_SUPPLIER_PAYMENT_PATHS.listSupplierPayments,
		async ({ request }) =>
			HttpResponse.json(listSupplierPaymentsFromUrl(new URL(request.url)))
	),
	createMockHandler(
		OPERATOR_SUPPLIER_PAYMENT_PATHS.getSupplierPayment(":paymentId"),
		async ({ params }) => {
			const payment = getSupplierPayment(String(params.paymentId));

			if (!payment) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(payment);
		}
	),
	createMockHandler(
		OPERATOR_SUPPLIER_PAYMENT_PATHS.updateSupplierPayment(":paymentId"),
		async ({ params, body }) => {
			const updated = updateSupplierPaymentInStore(
				String(params.paymentId),
				body as SupplierPaymentUpdate
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		OPERATOR_SUPPLIER_PAYMENT_PATHS.uploadReceipt(":paymentId"),
		async ({ request, params }) => {
			await request.formData();
			const updated = uploadReceiptInStore(String(params.paymentId));

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	)
];
