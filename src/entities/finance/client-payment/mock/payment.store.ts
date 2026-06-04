import {
	type ClientPaymentListResponse,
	type ClientPaymentResponse,
	ClientPaymentStatus,
	type ClientPaymentUpdate
} from "@/shared/api";

import { bookingOrderListItems } from "@/entities/booking/order/mock/booking-order.store";

import { ENUM_PAYMENT_STATUS } from "../types";
import type { TPaymentStatusCounts } from "../types";

import {
	MOCK_OPERATOR_ID,
	MOCK_PAYMENT_DEFAULTS,
	buildPaymentUuid
} from "./payment.mock.constants";
import { createClientPaymentMocks } from "./payment.mock.factory";

let payments: ClientPaymentResponse[] = createClientPaymentMocks();

export const resetClientPaymentsForTests = (): void => {
	payments = createClientPaymentMocks();
};

export const getPayment = (
	paymentId: string
): ClientPaymentResponse | undefined =>
	payments.find((payment) => payment.id === paymentId);

export const listAvailableBookingIds = (): string[] =>
	bookingOrderListItems.map((item) => item.id);

export interface IListPaymentsQuery {
	status: string | null;
	booking_id: string | null;
	q: string | null;
	skip: number;
	limit: number;
}

const filterPayments = ({
	status,
	booking_id,
	q
}: Pick<
	IListPaymentsQuery,
	"status" | "booking_id" | "q"
>): ClientPaymentResponse[] => {
	let filtered = [...payments];

	if (status) {
		filtered = filtered.filter((payment) => payment.status === status);
	}

	if (booking_id) {
		filtered = filtered.filter(
			(payment) => payment.booking_id === booking_id
		);
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter(
			(payment) =>
				payment.id.toLowerCase().includes(query) ||
				payment.booking_id.toLowerCase().includes(query) ||
				(payment.note?.toLowerCase().includes(query) ?? false)
		);
	}

	return filtered;
};

const computeStatusCounts = (
	items: ClientPaymentResponse[]
): TPaymentStatusCounts => {
	const counts: TPaymentStatusCounts = {
		[ENUM_PAYMENT_STATUS.ASSIGNED]: 0,
		[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: 0
	};

	for (const item of items) {
		if (item.status === ClientPaymentStatus.Confirmed) {
			counts[ENUM_PAYMENT_STATUS.ASSIGNED] += 1;
		} else {
			counts[ENUM_PAYMENT_STATUS.NOT_ASSIGNED] += 1;
		}
	}

	return counts;
};

export const listPayments = ({
	status,
	booking_id,
	q,
	skip,
	limit
}: IListPaymentsQuery): ClientPaymentListResponse => {
	const filtered = filterPayments({ status, booking_id, q });
	const data = filtered.slice(skip, skip + limit);

	return {
		total_count: filtered.length,
		data
	};
};

export const listPaymentsWithStatusCounts = (
	query: IListPaymentsQuery
): ClientPaymentListResponse & { status_counts: TPaymentStatusCounts } => {
	const filtered = filterPayments(query);
	const data = filtered.slice(query.skip, query.skip + query.limit);

	return {
		total_count: filtered.length,
		data,
		status_counts: computeStatusCounts(filtered)
	};
};

export const listPaymentsFromUrl = (
	url: URL
): ClientPaymentListResponse & { status_counts: TPaymentStatusCounts } =>
	listPaymentsWithStatusCounts({
		status: url.searchParams.get("status"),
		booking_id: url.searchParams.get("booking_id"),
		q: url.searchParams.get("q"),
		skip: Number(url.searchParams.get("skip")) || 0,
		limit: Number(url.searchParams.get("limit")) || 10
	});

export const createPaymentFromFormData = (
	formData: FormData
): ClientPaymentResponse | null => {
	const bookingId = String(formData.get("booking_id") ?? "");
	const amountUzs = Number(formData.get("amount_uzs"));
	const exchangeRate = Number(formData.get("exchange_rate"));

	if (!bookingId || !amountUzs || !exchangeRate) {
		return null;
	}

	const note = formData.get("note");
	const file = formData.get("file");
	const now = new Date().toISOString();

	const created: ClientPaymentResponse = {
		id: buildPaymentUuid(payments.length + 1),
		booking_id: bookingId,
		operator_id: MOCK_OPERATOR_ID,
		amount: amountUzs / exchangeRate,
		currency: MOCK_PAYMENT_DEFAULTS.currency,
		status: ClientPaymentStatus.NotConfirmed,
		note: typeof note === "string" && note.length > 0 ? note : null,
		has_attachment: file instanceof Blob && file.size > 0,
		created_at: now,
		updated_at: now
	};

	payments = [created, ...payments];

	return created;
};

export const updatePaymentInStore = (
	paymentId: string,
	patch: ClientPaymentUpdate
): ClientPaymentResponse | null => {
	const index = payments.findIndex((payment) => payment.id === paymentId);

	if (index === -1) {
		return null;
	}

	const current = payments[index];
	const updated: ClientPaymentResponse = {
		...current,
		amount: patch.amount ?? current.amount,
		note: patch.note !== undefined ? patch.note : current.note,
		updated_at: new Date().toISOString()
	};

	payments[index] = updated;

	return updated;
};

export const confirmPaymentInStore = (
	paymentId: string
): ClientPaymentResponse | null => {
	const index = payments.findIndex((payment) => payment.id === paymentId);

	if (index === -1) {
		return null;
	}

	const updated: ClientPaymentResponse = {
		...payments[index],
		status: ClientPaymentStatus.Confirmed,
		updated_at: new Date().toISOString()
	};

	payments[index] = updated;

	return updated;
};

export const deletePaymentFromStore = (paymentId: string): boolean => {
	const lengthBefore = payments.length;
	payments = payments.filter((payment) => payment.id !== paymentId);

	return payments.length < lengthBefore;
};
