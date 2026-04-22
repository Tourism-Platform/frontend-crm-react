import { type TFileMetadata } from "@/shared/hooks";
import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ENUM_PAYMENT_STATUS_TYPE } from "./payment-status.types";

export interface IPayment {
	id: string;
	paymentId: string;
	orderId: string;
	dateCreated: string;
	amount: number;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	status: ENUM_PAYMENT_STATUS_TYPE;
	note?: string;
	files?: TFileMetadata[];
}

export type TPaymentStatusCounts = Record<ENUM_PAYMENT_STATUS_TYPE, number>;

export interface IPaymentPaginatedResponse
	extends IPaginationResponse<IPayment> {
	statusCounts: TPaymentStatusCounts;
}
