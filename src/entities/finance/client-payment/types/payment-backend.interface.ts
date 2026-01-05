import { type TFileMetadata } from "@/shared/hooks";
import { type IPaginationResponse } from "@/shared/types";

import { type ENUM_PAYMENT_STATUS_TYPE } from "./payment-status.types";
import { type TPaymentStatusCounts } from "./payment.interface";

export interface IPaymentBackend {
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

export interface IPaymentPaginatedResponseBackend
	extends IPaginationResponse<IPaymentBackend> {
	status_counts: TPaymentStatusCounts;
}
