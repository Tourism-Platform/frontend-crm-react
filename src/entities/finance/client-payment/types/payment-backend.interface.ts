import type { CLIENT_PAYMENT_PATHS, ClientPaymentResponse } from "@/shared/api";
import type { ClientPaymentUpdate } from "@/shared/api";

export type TPaymentBackend = ClientPaymentResponse;

export type TPaymentBackendResponse =
	typeof CLIENT_PAYMENT_PATHS.listPayments._types.response;

export type TPaymentListResponseInput = TPaymentBackendResponse & {
	status_counts?: import("./payment.interface").TPaymentStatusCounts;
};

export type TCreatePaymentBackend =
	typeof CLIENT_PAYMENT_PATHS.createPayment._types.body;

export type TUpdatePaymentBackend = ClientPaymentUpdate;
