import { type ENUM_PAYMENT_STATUS_TYPE } from "./payment-status.types";

export interface IPaymentFilters {
	search: string;
	status: ENUM_PAYMENT_STATUS_TYPE[];
	page: number;
	limit: number;
}
