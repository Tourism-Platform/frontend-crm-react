import { CLIENT_PAYMENT_PATHS } from "@/shared/api";
import { formatDate } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";

import { PAYMENT_NO_DATA } from "../constants";
import {
	ENUM_PAYMENT_STATUS,
	type IPayment,
	type IPaymentFilters,
	type IPaymentPaginatedResponse,
	type TCreatePaymentBackend,
	type TNewPaymentSchema,
	type TPaymentBackend,
	type TPaymentListResponseInput,
	type TUpdatePaymentBackend
} from "../types";

import { paymentStatusConverter } from "./payment-status.converter";

export const mapPaymentToFrontend = (payment: TPaymentBackend): IPayment => ({
	id: payment.id,
	paymentId: payment.id,
	orderId: payment.booking_id,
	dateCreated: payment.created_at
		? formatDate(payment.created_at)
		: PAYMENT_NO_DATA,
	amount: payment.amount,
	currency: currencyConverter.from(payment.currency)!,
	status: paymentStatusConverter.from(payment.status)!,
	note: payment.note ?? undefined,
	files: undefined
});

export const mapCreatePaymentToBackend = (
	payment: TNewPaymentSchema
): TCreatePaymentBackend => {
	const fileCandidate = payment.files?.[0]?.file ?? payment.files?.[0];

	return {
		booking_id: payment.orderId,
		amount_uzs: payment.amount,
		exchange_rate: payment.rate,
		note: payment.note || null,
		file:
			fileCandidate instanceof Blob
				? (fileCandidate as File)
				: new File([], "payment.pdf", { type: "application/pdf" })
	};
};

export const mapUpdatePaymentToBackend = (
	payment: Partial<IPayment>
): TUpdatePaymentBackend => ({
	amount: payment.amount,
	note: payment.note ?? null
});

const emptyStatusCounts = (): IPaymentPaginatedResponse["statusCounts"] => ({
	[ENUM_PAYMENT_STATUS.ASSIGNED]: 0,
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: 0
});

export const mapPaymentsPaginatedToFrontend = (
	response: TPaymentListResponseInput
): IPaymentPaginatedResponse => ({
	data: response.data.map(mapPaymentToFrontend),
	total: response.total_count,
	statusCounts: response.status_counts ?? emptyStatusCounts()
});

export const mapPaymentFiltersToBackend = (
	filters: IPaymentFilters
): typeof CLIENT_PAYMENT_PATHS.listPayments._types.query & { q?: string } => {
	const search = filters.search.trim();

	return {
		skip: (filters.page - 1) * filters.limit,
		limit: filters.limit,
		status:
			filters.status.length > 0
				? paymentStatusConverter.to(filters.status[0])
				: undefined,
		...(search ? { q: search } : {})
	};
};
