import type {
	BodyUploadReceiptOperatorSupplierPaymentPaymentIdReceiptPost,
	SupplierPaymentResponse,
	SupplierPaymentUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_SUPPLIER_PAYMENT_PATHS = {
	listSupplierPayments: {
		url: "/operator/supplier-payment",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				booking_id?: string | null;
				supplier_id?: string | null;
				event_id?: string | null;
				skip?: number;
				limit?: number;
			};
			response: SupplierPaymentResponse[];
		}
	} as const,
	getSupplierPayment: (paymentId: string) =>
		({
			url: `/operator/supplier-payment/${paymentId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: SupplierPaymentResponse;
			}
		}) as const,
	updateSupplierPayment: (paymentId: string) =>
		({
			url: `/operator/supplier-payment/${paymentId}`,
			method: "PATCH",
			_types: {} as {
				body: SupplierPaymentUpdate;
				query: void;
				response: SupplierPaymentResponse;
			}
		}) as const,
	uploadReceipt: (paymentId: string) =>
		({
			url: `/operator/supplier-payment/${paymentId}/receipt`,
			method: "POST",
			_types: {} as {
				body: BodyUploadReceiptOperatorSupplierPaymentPaymentIdReceiptPost;
				query: void;
				response: SupplierPaymentResponse;
			}
		}) as const
} as const;
