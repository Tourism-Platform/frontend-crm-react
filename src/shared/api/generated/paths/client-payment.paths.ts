import type {
	BodyCreatePaymentBookingPaymentPost,
	ClientPaymentListResponse,
	ClientPaymentResponse,
	ClientPaymentStatus,
	ClientPaymentUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const CLIENT_PAYMENT_PATHS = {
	listPayments: {
		url: "/booking/payment",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				skip?: number;
				limit?: number;
				status?: ClientPaymentStatus | null;
				booking_id?: string | null;
				created_from?: string | null;
				created_to?: string | null;
			};
			response: ClientPaymentListResponse;
		}
	} as const,
	createPayment: {
		url: "/booking/payment",
		method: "POST",
		_types: {} as {
			body: BodyCreatePaymentBookingPaymentPost;
			query: void;
			response: ClientPaymentResponse;
		}
	} as const,
	getPayment: (paymentId: string) =>
		({
			url: `/booking/payment/${paymentId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: ClientPaymentResponse;
			}
		}) as const,
	updatePayment: (paymentId: string) =>
		({
			url: `/booking/payment/${paymentId}`,
			method: "PATCH",
			_types: {} as {
				body: ClientPaymentUpdate;
				query: void;
				response: ClientPaymentResponse;
			}
		}) as const,
	deletePayment: (paymentId: string) =>
		({
			url: `/booking/payment/${paymentId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	confirmPayment: (paymentId: string) =>
		({
			url: `/booking/payment/${paymentId}/confirm`,
			method: "POST",
			_types: {} as {
				body: void;
				query: void;
				response: ClientPaymentResponse;
			}
		}) as const,
	downloadAttachment: (paymentId: string) =>
		({
			url: `/booking/payment/${paymentId}/attachment`,
			method: "GET",
			_types: {} as { body: void; query: void; response: string }
		}) as const
} as const;
