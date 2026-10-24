import type {
	CLIENT_PAYMENT_PATHS,
	ClientPaymentFile,
	ClientPaymentListResponse,
	ClientPaymentResponse,
	ClientPaymentUpdate
} from "@/shared/api";

export type TPaymentBackend = ClientPaymentResponse;

export type TPaymentBackendResponse =
	typeof CLIENT_PAYMENT_PATHS.listPayments._types.response;

export type TPaymentListResponseInput = TPaymentBackendResponse & {
	status_counts?: import("./payment.interface").TPaymentStatusCounts;
};

export type TCreatePaymentBackend =
	typeof CLIENT_PAYMENT_PATHS.createPayment._types.body;

export type TUpdatePaymentBackend = ClientPaymentUpdate;
export type TClientPaymentFileBackend = ClientPaymentFile;
export type TClientPaymentListResponseBackend = ClientPaymentListResponse;

export type TPaymentListQueryBackend =
	typeof CLIENT_PAYMENT_PATHS.listPayments._types.query;
