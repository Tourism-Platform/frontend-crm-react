import type { SupplierPaymentListRowOutput } from "@/shared/api/generated/Api";

import { supplierPaymentStatusConverter } from "../converters/supplier-payment-status.converter";
import { ENUM_SUPPLIER_PAYMENT_STATUS } from "../types";
import type {
	TSupplierPaymentBackend,
	TSupplierPaymentListResponseInput,
	TSupplierPaymentStatusCounts,
	TUpdateSupplierPaymentBackend
} from "../types";

import { getSupplierPaymentMockDisplay } from "./supplier-payment.mock-display";
import { MOCK_RECEIPT_URL } from "./supplier-payment.mock.constants";
import { createSupplierPaymentMocks } from "./supplier-payment.mock.factory";

const CONFIRMED_STATUS = supplierPaymentStatusConverter.to(
	ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
)!;

const { payments: seedPayments } = createSupplierPaymentMocks();

const payments: TSupplierPaymentBackend[] = [...seedPayments];

export { getSupplierPaymentMockDisplay };

export const getSupplierPayment = (
	paymentId: string
): TSupplierPaymentBackend | undefined =>
	payments.find((payment) => payment.payment_id === paymentId);

export interface IListSupplierPaymentsQuery {
	booking_id: string | null;
	supplier_id: string | null;
	event_id: string | null;
	status: string | null;
	q: string | null;
	skip: number;
	limit: number;
}

const filterPayments = ({
	booking_id,
	supplier_id,
	event_id,
	status,
	q
}: Pick<
	IListSupplierPaymentsQuery,
	"booking_id" | "supplier_id" | "event_id" | "status" | "q"
>): TSupplierPaymentBackend[] => {
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
		filtered = filtered.filter((p) => p.status === status);
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter((p) => {
			const display = getSupplierPaymentMockDisplay(p.payment_id);
			return (
				p.payment_id.toLowerCase().includes(query) ||
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
	items: TSupplierPaymentBackend[]
): TSupplierPaymentStatusCounts => {
	const counts: TSupplierPaymentStatusCounts = {
		[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: 0,
		[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: 0
	};

	for (const item of items) {
		const uiStatus = supplierPaymentStatusConverter.from(item.status);

		if (uiStatus === ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED) {
			counts[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED] += 1;
		} else {
			counts[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED] += 1;
		}
	}

	return counts;
};

const toListRow = (
	payment: TSupplierPaymentBackend
): SupplierPaymentListRowOutput => ({
	payment_id: payment.payment_id,
	booking_id: payment.booking_id,
	order_number: payment.order_number,
	event_id: payment.event_id,
	event_name: payment.event_name,
	event_typ: payment.event_typ,
	supplier_id: payment.supplier_id,
	supplier_name: payment.supplier_name,
	amount: payment.amount,
	currency: payment.currency,
	base_amount: payment.base_amount,
	receipt_count: payment.files.length,
	status: payment.status,
	paid_at: payment.paid_at
});

export const listSupplierPayments = (
	query: IListSupplierPaymentsQuery
): TSupplierPaymentListResponseInput => {
	const filtered = filterPayments(query);

	return {
		total_count: filtered.length,
		data: filtered
			.slice(query.skip, query.skip + query.limit)
			.map(toListRow),
		status_counts: computeStatusCounts(filtered)
	};
};

export const listSupplierPaymentsFromUrl = (
	url: URL
): TSupplierPaymentListResponseInput =>
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
	patch: TUpdateSupplierPaymentBackend
): TSupplierPaymentBackend | null => {
	const index = payments.findIndex((p) => p.payment_id === paymentId);

	if (index === -1) {
		return null;
	}

	const current = payments[index];
	const amount = patch.amount != null ? String(patch.amount) : current.amount;

	const updated: TSupplierPaymentBackend = {
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
			patch.status != null &&
			supplierPaymentStatusConverter.from(patch.status) ===
				ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
				? new Date().toISOString()
				: current.paid_at
	};

	payments[index] = updated;

	return updated;
};

export const uploadReceiptInStore = (
	paymentId: string,
	fileName = "receipt.pdf"
): TSupplierPaymentBackend | null => {
	const index = payments.findIndex((p) => p.payment_id === paymentId);

	if (index === -1) {
		return null;
	}

	const current = payments[index];
	const fileId = `${paymentId}-receipt-${current.files.length + 1}-${Date.now()}`;

	const updated: TSupplierPaymentBackend = {
		...current,
		files: [
			...current.files,
			{
				file_id: fileId,
				file_name: fileName,
				url: MOCK_RECEIPT_URL
			}
		],
		status: CONFIRMED_STATUS,
		paid_at: new Date().toISOString()
	};

	payments[index] = updated;

	return updated;
};

export const removeReceiptInStore = (
	paymentId: string,
	fileId: string
): TSupplierPaymentBackend | null => {
	const index = payments.findIndex((p) => p.payment_id === paymentId);

	if (index === -1) {
		return null;
	}

	const current = payments[index];
	const nextFiles = current.files.filter((file) => file.file_id !== fileId);

	if (nextFiles.length === current.files.length) {
		return null;
	}

	const updated: TSupplierPaymentBackend = {
		...current,
		files: nextFiles
	};

	payments[index] = updated;

	return updated;
};
