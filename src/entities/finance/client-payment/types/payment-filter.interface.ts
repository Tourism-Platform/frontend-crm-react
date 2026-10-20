import { type ENUM_PAYMENT_STATUS_TYPE } from "./payment-status.types";

export const ENUM_PAYMENT_FILTER = {
	BOOKING_ID: "bookingId",
	CREATED_RANGE: "createdRange"
} as const;

export type ENUM_PAYMENT_FILTER_TYPE =
	(typeof ENUM_PAYMENT_FILTER)[keyof typeof ENUM_PAYMENT_FILTER];

export interface IPaymentFilters {
	search: string;
	status: ENUM_PAYMENT_STATUS_TYPE[];
	page: number;
	limit: number;
	bookingId?: string;
	createdRange?: { from?: Date; to?: Date };
}
