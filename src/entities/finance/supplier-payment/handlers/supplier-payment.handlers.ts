import { HttpResponse } from "msw";

import {
	OPERATOR_SUPPLIER_PAYMENT_PATHS,
	createMockHandler
} from "@/shared/api";

import {
	getSupplierPayment,
	listSupplierPaymentsFromUrl,
	removeReceiptInStore,
	updateSupplierPaymentInStore,
	uploadReceiptInStore
} from "../mock/supplier-payment.store";
import type { TUpdateSupplierPaymentBackend } from "../types";

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
				body as TUpdateSupplierPaymentBackend
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
			const formData = await request.formData();
			const file = formData.get("file");
			const fileName =
				file instanceof File && file.name ? file.name : "receipt.pdf";
			const updated = uploadReceiptInStore(
				String(params.paymentId),
				fileName
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		OPERATOR_SUPPLIER_PAYMENT_PATHS.removeReceipt(":paymentId", ":fileId"),
		async ({ params }) => {
			const updated = removeReceiptInStore(
				String(params.paymentId),
				String(params.fileId)
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	)
];
