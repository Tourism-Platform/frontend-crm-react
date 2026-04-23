import { CLIENT_PAYMENT_PATHS, ClientPaymentStatus } from "@/shared/api";
import { formatDate } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";

import {
	ENUM_PAYMENT_STATUS,
	type IPayment,
	type IPaymentFilters,
	type IPaymentPaginatedResponse,
	type TCreatePaymentBackend,
	type TNewPaymentSchema,
	type TPaymentBackend,
	type TPaymentBackendResponse,
	type TUpdatePaymentBackend
} from "../types";

import { paymentStatusConverter } from "./payment-status.converter";

export const mapPaymentToFrontend = (payment: TPaymentBackend): IPayment => ({
	id: payment.id,
	paymentId: payment.id,
	orderId: payment.booking_id,
	dateCreated: formatDate(payment.created_at || ""),
	amount: payment.amount,
	currency: currencyConverter.from(payment.currency) as "USD",
	status: paymentStatusConverter.from(payment.status)!,
	note: payment.note!,
	files: undefined
});

export const mapCreatePaymentToBackend = (
	payment: TNewPaymentSchema
): TCreatePaymentBackend => ({
	booking_id: payment.orderId,
	amount_uzs: payment.amount,
	exchange_rate: payment.rate,
	note: payment.note || null,
	file: payment.files?.[0]?.file || payment.files?.[0]
});

export const mapUpdatePaymentToBackend = (
	payment: Partial<IPayment>
): TUpdatePaymentBackend => ({
	amount: payment.amount,
	note: payment.note || null
});

export const mapPaymentsPaginatedToFrontend = (
	response: TPaymentBackendResponse
): IPaymentPaginatedResponse => ({
	data: response.data.map(mapPaymentToFrontend),
	total: response.total_count,
	statusCounts: {
		[ENUM_PAYMENT_STATUS.ASSIGNED]: 0,
		[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: 0
	}
});

export const mapPaymentFiltersToBackend = (
	filters: IPaymentFilters
): typeof CLIENT_PAYMENT_PATHS.listPayments._types.query => ({
	skip: (filters.page - 1) * filters.limit,
	limit: filters.limit,
	status:
		filters.status.length > 0
			? paymentStatusConverter.to(filters.status[0])
			: ClientPaymentStatus.Confirmed
});
