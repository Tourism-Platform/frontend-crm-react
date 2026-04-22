import type { CLIENT_PAYMENT_PATHS, ClientPaymentResponse } from "@/shared/api";
import { type TFileMetadata } from "@/shared/hooks";

// import { type IPaginationResponse } from "@/shared/types";

import { type ENUM_PAYMENT_STATUS_TYPE } from "./payment-status.types";

export type TPaymentBackend = ClientPaymentResponse;

export interface IPaymentBackend
	extends Omit<TPaymentBackend, "files" | "status" | "currency"> {
	id: string;
	payment_id: string;
	order_id: string;
	date_created: string;
	amount: number;
	currency: "USD";
	status: ENUM_PAYMENT_STATUS_TYPE;
	note?: string;
	files?: TFileMetadata[];
}

// export type TPaymentPaginatedResponseBackend =
// 	IPaginationResponse<TPaymentBackend>;

export type TPaymentBackendResponse =
	typeof CLIENT_PAYMENT_PATHS.listPayments._types.response;

export type TCreatePaymentBackend =
	typeof CLIENT_PAYMENT_PATHS.createPayment._types.body;
