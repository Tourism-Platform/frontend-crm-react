import { HttpResponse } from "msw";

import { CLIENT_PAYMENT_PATHS, createMockHandler } from "@/shared/api";

import {
	addAttachmentInStore,
	buildAttachmentBlob,
	confirmPaymentInStore,
	createPaymentFromFormData,
	deletePaymentFromStore,
	getAttachmentInStore,
	getPayment,
	listAttachmentsInStore,
	listPaymentsFromUrl,
	removeAttachmentInStore,
	updatePaymentInStore
} from "../mock/payment.store";
import type { TUpdatePaymentBackend } from "../types";

export const financeClientPaymentHandlers = [
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
		CLIENT_PAYMENT_PATHS.getPayment(":paymentId"),
		async ({ params }) => {
			const payment = getPayment(String(params.paymentId));

			if (!payment) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(payment);
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.updatePayment(":paymentId"),
		async ({ params, body }) => {
			const updated = updatePaymentInStore(
				String(params.paymentId),
				body as TUpdatePaymentBackend
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.confirmPayment(":paymentId"),
		async ({ params }) => {
			const updated = confirmPaymentInStore(String(params.paymentId));

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.listAttachments(":paymentId"),
		async ({ params }) => {
			const files = listAttachmentsInStore(String(params.paymentId));

			if (!files) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(files);
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.addAttachment(":paymentId"),
		async ({ params, request }) => {
			const formData = await request.formData();
			const file = formData.get("file");
			const fileName =
				file instanceof File && file.name
					? file.name
					: "attachment.pdf";

			const created = addAttachmentInStore(
				String(params.paymentId),
				fileName
			);

			if (!created) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(created, { status: 201 });
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.downloadAttachment(":paymentId", ":fileId"),
		async ({ params }) => {
			const paymentId = String(params.paymentId);
			const fileId = String(params.fileId);
			const file = getAttachmentInStore(paymentId, fileId);

			if (!file) {
				return new HttpResponse(null, { status: 404 });
			}

			return new HttpResponse(buildAttachmentBlob(file.file_name), {
				status: 200,
				headers: {
					"Content-Type": "application/pdf",
					"Content-Disposition": `attachment; filename="${file.file_name}"`
				}
			});
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.removeAttachment(":paymentId", ":fileId"),
		async ({ params }) => {
			const deleted = removeAttachmentInStore(
				String(params.paymentId),
				String(params.fileId)
			);

			if (!deleted) {
				return new HttpResponse(null, { status: 404 });
			}

			return new HttpResponse(null, { status: 204 });
		}
	),
	createMockHandler(
		CLIENT_PAYMENT_PATHS.deletePayment(":paymentId"),
		async ({ params }) => {
			const deleted = deletePaymentFromStore(String(params.paymentId));

			if (!deleted) {
				return new HttpResponse(null, { status: 404 });
			}

			return new HttpResponse(null, { status: 204 });
		}
	)
];
