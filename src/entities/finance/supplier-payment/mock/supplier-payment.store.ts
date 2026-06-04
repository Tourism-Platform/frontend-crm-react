import {
	type SupplierPaymentResponse,
	SupplierPaymentStatus,
	type SupplierPaymentUpdate
} from "@/shared/api";

import { ENUM_SUPPLIER_PAYMENT_STATUS } from "../types";
import type { TSupplierPaymentStatusCounts } from "../types";

import { getSupplierPaymentMockDisplay } from "./supplier-payment.mock-display";
import { MOCK_RECEIPT_URL } from "./supplier-payment.mock.constants";
import { createSupplierPaymentMocks } from "./supplier-payment.mock.factory";

const { payments: seedPayments } = createSupplierPaymentMocks();

const payments: SupplierPaymentResponse[] = [...seedPayments];

export { getSupplierPaymentMockDisplay };

export interface ISupplierPaymentListMeta {
	total: number;
	status_counts: TSupplierPaymentStatusCounts;
}

let lastListMeta: ISupplierPaymentListMeta | null = null;

export const consumeLastSupplierPaymentListMeta =
	(): ISupplierPaymentListMeta | null => {
		const meta = lastListMeta;
		lastListMeta = null;
		return meta;
	};

export const getSupplierPayment = (
	paymentId: string
): SupplierPaymentResponse | undefined =>
	payments.find((payment) => payment.id === paymentId);

export interface IListSupplierPaymentsQuery {
	booking_id: string | null;
	supplier_id: string | null;
	event_id: string | null;
	status: string | null;
	q: string | null;
	skip: number;
	limit: number;
}

const uiStatusToApi = (status: string): SupplierPaymentStatus | null => {
	if (status === ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED) {
		return SupplierPaymentStatus.Paid;
	}
	if (status === ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED) {
		return SupplierPaymentStatus.NotPaid;
	}
	return null;
};

const filterPayments = ({
	booking_id,
	supplier_id,
	event_id,
	status,
	q
}: Pick<
	IListSupplierPaymentsQuery,
	"booking_id" | "supplier_id" | "event_id" | "status" | "q"
>): SupplierPaymentResponse[] => {
	let filtered = [...payments];

	if (booking_id) {
		filtered = filtered.filter((p) => p.booking_id === booking_id);
	}

	if (supplier_id) {
		filtered = filtered.filter((p) => p.supplier_id === supplier_id);
	}

	if (event_id) {
		filtered = filtered.filter((p) => p.event_id === event_id);
	}

	if (status) {
		const apiStatuses = status
			.split(",")
			.map(uiStatusToApi)
			.filter((s): s is SupplierPaymentStatus => s != null);

		if (apiStatuses.length > 0) {
			filtered = filtered.filter((p) => apiStatuses.includes(p.status));
		}
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter((p) => {
			const display = getSupplierPaymentMockDisplay(p.id);
			return (
				p.id.toLowerCase().includes(query) ||
				p.booking_id.toLowerCase().includes(query) ||
				(p.note?.toLowerCase().includes(query) ?? false) ||
				(display?.component.toLowerCase().includes(query) ?? false) ||
				(display?.supplier.toLowerCase().includes(query) ?? false)
			);
		});
	}

	return filtered;
};

const computeStatusCounts = (
	items: SupplierPaymentResponse[]
): TSupplierPaymentStatusCounts => {
	const counts: TSupplierPaymentStatusCounts = {
		[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: 0,
		[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: 0
	};

	for (const item of items) {
		if (item.status === SupplierPaymentStatus.Paid) {
			counts[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED] += 1;
		} else {
			counts[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED] += 1;
		}
	}

	return counts;
};

export const listSupplierPayments = (
	query: IListSupplierPaymentsQuery
): SupplierPaymentResponse[] => {
	const filtered = filterPayments(query);
	lastListMeta = {
		total: filtered.length,
		status_counts: computeStatusCounts(filtered)
	};

	return filtered.slice(query.skip, query.skip + query.limit);
};

export const listSupplierPaymentsFromUrl = (
	url: URL
): SupplierPaymentResponse[] =>
	listSupplierPayments({
		booking_id: url.searchParams.get("booking_id"),
		supplier_id: url.searchParams.get("supplier_id"),
		event_id: url.searchParams.get("event_id"),
		status: url.searchParams.get("status"),
		q: url.searchParams.get("q"),
		skip: Number(url.searchParams.get("skip")) || 0,
		limit: Number(url.searchParams.get("limit")) || 10
	});

export const updateSupplierPaymentInStore = (
	paymentId: string,
	patch: SupplierPaymentUpdate
): SupplierPaymentResponse | null => {
	const index = payments.findIndex((p) => p.id === paymentId);

	if (index === -1) {
		return null;
	}

	const current = payments[index];
	const amount = patch.amount != null ? String(patch.amount) : current.amount;

	const updated: SupplierPaymentResponse = {
		...current,
		supplier_id:
			patch.supplier_id !== undefined
				? patch.supplier_id
				: current.supplier_id,
		amount,
		base_amount: amount,
		currency: patch.currency ?? current.currency,
		note: patch.note !== undefined ? patch.note : current.note,
		status: patch.status ?? current.status,
		paid_at:
			patch.status === SupplierPaymentStatus.Paid
				? new Date().toISOString()
				: current.paid_at
	};

	payments[index] = updated;

	return updated;
};

export const uploadReceiptInStore = (
	paymentId: string
): SupplierPaymentResponse | null => {
	const index = payments.findIndex((p) => p.id === paymentId);

	if (index === -1) {
		return null;
	}

	const updated: SupplierPaymentResponse = {
		...payments[index],
		file: MOCK_RECEIPT_URL,
		status: SupplierPaymentStatus.Paid,
		paid_at: new Date().toISOString()
	};

	payments[index] = updated;

	return updated;
};
