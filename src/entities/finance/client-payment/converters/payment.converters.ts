import { formatDate } from "@/shared/utils";

import {
	type IPayment,
	type IPaymentBackend,
	type IPaymentFilters,
	type IPaymentPaginatedResponse,
	type IPaymentPaginatedResponseBackend
} from "../types";

export const mapPaymentToFrontend = (payment: IPaymentBackend): IPayment => ({
	id: payment.id,
	paymentId: payment.payment_id,
	orderId: payment.order_id,
	dateCreated: formatDate(payment.date_created),
	amount: payment.amount,
	currency: payment.currency,
	status: payment.status,
	note: payment.note
});

export const mapPaymentToBackend = (
	payment: Partial<IPayment>
): Partial<IPaymentBackend> => ({
	id: payment.id,
	order_id: payment.orderId,
	amount: payment.amount,
	status: payment.status,
	note: payment.note
});

export const mapPaymentsPaginatedToFrontend = (
	response: IPaymentPaginatedResponseBackend
): IPaymentPaginatedResponse => ({
	data: response.data.map(mapPaymentToFrontend),
	total: response.total,
	statusCounts: response.status_counts
});

export const mapPaymentFiltersToBackend = (filters: IPaymentFilters) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});
