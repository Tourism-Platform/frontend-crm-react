import type { TFileMetadata } from "@/shared/hooks";
import { formatDate, formatDateToISO } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";

import { PAYMENT_NO_DATA } from "../constants";
import {
	ENUM_PAYMENT_STATUS,
	type IPayment,
	type IPaymentFilters,
	type IPaymentPaginatedResponse,
	type TClientPaymentFileBackend,
	type TCreatePaymentBackend,
	type TNewPaymentSchema,
	type TPaymentBackend,
	type TPaymentListQueryBackend,
	type TPaymentListResponseInput,
	type TUpdatePaymentBackend
} from "../types";

import { paymentStatusConverter } from "./payment-status.converter";

export const mapAttachmentToFileMetadata = (
	file: TClientPaymentFileBackend
): TFileMetadata => ({
	id: file.file_id,
	name: file.file_name,
	size: 0,
	type: "",
	url: ""
});

export const mapPaymentToFrontend = (payment: TPaymentBackend): IPayment => ({
	id: payment.id,
	paymentId: payment.id,
	orderId: payment.order_number ?? PAYMENT_NO_DATA,
	bookingId: payment.booking_id,
	tourName: payment.tour_name ?? PAYMENT_NO_DATA,
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
): TCreatePaymentBackend => ({
	booking_id: payment.orderId,
	amount_uzs: payment.amount,
	exchange_rate: payment.rate,
	note: payment.note || null,
	// Схема гарантирует хотя бы один файл
	file: payment.files[0].file
});

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
): TPaymentListQueryBackend & { q?: string } => {
	const search = filters.search.trim();

	return {
		skip: (filters.page - 1) * filters.limit,
		limit: filters.limit,
		status:
			filters.status.length > 0
				? paymentStatusConverter.to(filters.status[0])
				: undefined,
		...(search ? { q: search } : {}),
		...(filters.bookingId && { booking_id: filters.bookingId }),
		...(filters.createdRange?.from && {
			created_from: formatDateToISO(filters.createdRange.from)
		}),
		...(filters.createdRange?.to && {
			created_to: formatDateToISO(filters.createdRange.to)
		})
	};
};
