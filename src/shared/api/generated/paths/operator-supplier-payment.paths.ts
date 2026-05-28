import type {
	BodyUploadReceiptOperatorSupplierPaymentPaymentIdReceiptPost,
	SupplierPaymentCreate,
	SupplierPaymentModel,
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
				supplier_id?: string | null;
				item_id?: string | null;
				skip?: number;
				limit?: number;
			};
			response: SupplierPaymentModel[];
		}
	} as const,
	createSupplierPayment: {
		url: "/operator/supplier-payment",
		method: "POST",
		_types: {} as {
			body: SupplierPaymentCreate;
			query: void;
			response: SupplierPaymentModel;
		}
	} as const,
	getSupplierPayment: (paymentId: string) =>
		({
			url: `/operator/supplier-payment/${paymentId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: SupplierPaymentModel;
			}
		}) as const,
	updateSupplierPayment: (paymentId: string) =>
		({
			url: `/operator/supplier-payment/${paymentId}`,
			method: "PATCH",
			_types: {} as {
				body: SupplierPaymentUpdate;
				query: void;
				response: SupplierPaymentModel;
			}
		}) as const,
	uploadReceipt: (paymentId: string) =>
		({
			url: `/operator/supplier-payment/${paymentId}/receipt`,
			method: "POST",
			_types: {} as {
				body: BodyUploadReceiptOperatorSupplierPaymentPaymentIdReceiptPost;
				query: void;
				response: SupplierPaymentModel;
			}
		}) as const
} as const;
