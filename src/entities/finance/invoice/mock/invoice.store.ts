import { getBookingOrderDetail } from "@/entities/booking/order/mock/booking-order.store";

import {
	ENUM_INVOICE_STATUS_BACKEND,
	type ENUM_INVOICE_STATUS_BACKEND_TYPE,
	type TInvoiceDetailResponseBackend,
	type TInvoiceGenerateBackend,
	type TInvoiceListItemBackend,
	type TInvoiceListResponseBackend
} from "../types";

import { MOCK_INVOICE_DEFAULTS } from "./invoice.mock.constants";
import { createInvoiceMocks } from "./invoice.mock.factory";

const { listItems, detailsById } = createInvoiceMocks();

/** Мутируются на месте: генерация и оплата инвойса меняют оба */
export const invoiceListItems: TInvoiceListItemBackend[] = listItems;
export const invoiceDetailStore = detailsById;
const invoicePdfUrls = new Map<string, string>();
let nextInvoiceNumber = 1;

export const getInvoiceDetail = (
	invoiceId: string
): TInvoiceDetailResponseBackend | undefined =>
	invoiceDetailStore.get(invoiceId);

export interface IListInvoicesQuery {
	statuses: string[];
	q: string | null;
	skip: number;
	limit: number;
}

const filterInvoiceItems = ({
	statuses,
	q
}: Pick<IListInvoicesQuery, "statuses" | "q">): TInvoiceListItemBackend[] => {
	let filtered = [...invoiceListItems];

	if (statuses.length > 0) {
		filtered = filtered.filter((item) => statuses.includes(item.status));
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter(
			(item) =>
				item.invoice_number.toLowerCase().includes(query) ||
				(item.order_number?.toLowerCase().includes(query) ?? false)
		);
	}

	return filtered;
};

const parseStatuses = (url: URL): string[] =>
	url.searchParams.getAll("statuses").filter(Boolean);

const computeStatusCounts = (
	items: TInvoiceListItemBackend[]
): Record<ENUM_INVOICE_STATUS_BACKEND_TYPE, number> => {
	const counts = Object.values(ENUM_INVOICE_STATUS_BACKEND).reduce(
		(acc, status) => {
			acc[status] = 0;
			return acc;
		},
		{} as Record<ENUM_INVOICE_STATUS_BACKEND_TYPE, number>
	);

	for (const item of items) {
		counts[item.status] += 1;
	}

	return counts;
};

export const listInvoicesFromUrl = (
	url: URL
): TInvoiceListResponseBackend & {
	status_counts: Record<ENUM_INVOICE_STATUS_BACKEND_TYPE, number>;
} => {
	const query: IListInvoicesQuery = {
		statuses: parseStatuses(url),
		q: url.searchParams.get("q"),
		skip: Number(url.searchParams.get("skip")) || 0,
		limit: Number(url.searchParams.get("limit")) || 10
	};

	return listInvoicesWithStatusCounts(query);
};

export const listInvoices = ({
	statuses,
	q,
	skip,
	limit
}: IListInvoicesQuery): TInvoiceListResponseBackend => {
	const filtered = filterInvoiceItems({ statuses, q });
	const data = filtered.slice(skip, skip + limit);

	return { total_count: filtered.length, data };
};

export const listInvoicesWithStatusCounts = (
	query: IListInvoicesQuery
): TInvoiceListResponseBackend & {
	status_counts: Record<ENUM_INVOICE_STATUS_BACKEND_TYPE, number>;
} => {
	const filtered = filterInvoiceItems(query);
	const data = filtered.slice(query.skip, query.skip + query.limit);

	return {
		total_count: filtered.length,
		data,
		status_counts: computeStatusCounts(filtered)
	};
};

export const getInvoicePdfUrl = (detail: TInvoiceDetailResponseBackend) =>
	invoicePdfUrls.get(detail.id) ??
	`https://example.com/invoices/${detail.invoice_number}.pdf`;

export const generateInvoiceInStore = (
	body: TInvoiceGenerateBackend
): TInvoiceDetailResponseBackend | undefined => {
	const booking = getBookingOrderDetail(body.booking_id)?.order;
	if (!booking) return undefined;

	const id = crypto.randomUUID();
	const invoice_number = `INV-NEW-${String(nextInvoiceNumber++).padStart(2, "0")}`;
	const issued_at = new Date().toISOString();
	const total = booking.tour_amount;

	const detail: TInvoiceDetailResponseBackend = {
		id,
		invoice_number,
		booking_id: booking.id,
		order_number: booking.order_number,
		typ: MOCK_INVOICE_DEFAULTS.typ,
		status: ENUM_INVOICE_STATUS_BACKEND.SENT,
		amount: total,
		currency: MOCK_INVOICE_DEFAULTS.currency,
		total,
		paid_amount: "0",
		balance: total,
		issued_at,
		payment_details: null
	};

	invoiceDetailStore.set(id, detail);
	invoiceListItems.unshift({
		id,
		booking_id: booking.id,
		status: detail.status,
		total_amount: Number(total),
		paid_amount: 0,
		typ: detail.typ,
		counterparty_name: "Tour Firm",
		currency: MOCK_INVOICE_DEFAULTS.currency,
		issue_date: issued_at,
		invoice_number,
		order_number: booking.order_number
	});

	return detail;
};

export const recordInvoicePaymentInStore = (
	invoiceId: string,
	amount: number
): TInvoiceDetailResponseBackend | undefined => {
	const detail = invoiceDetailStore.get(invoiceId);
	if (!detail) return undefined;

	const total = Number(detail.total);
	const paid = Number(detail.paid_amount) + amount;
	const status =
		paid >= total
			? ENUM_INVOICE_STATUS_BACKEND.PAID
			: ENUM_INVOICE_STATUS_BACKEND.PARTIAL;
	const updated: TInvoiceDetailResponseBackend = {
		...detail,
		status,
		paid_amount: String(paid),
		balance: String(Math.max(total - paid, 0))
	};

	invoiceDetailStore.set(invoiceId, updated);
	const listItem = invoiceListItems.find((item) => item.id === invoiceId);
	if (listItem) {
		listItem.status = status;
		listItem.paid_amount = paid;
	}

	return updated;
};

export const uploadInvoicePdfInStore = (
	invoiceId: string,
	fileName: string
): TInvoiceDetailResponseBackend | undefined => {
	const detail = invoiceDetailStore.get(invoiceId);
	if (!detail) return undefined;

	invoicePdfUrls.set(invoiceId, `https://example.com/invoices/${fileName}`);
	return detail;
};

export const resetInvoiceStore = () => {
	const fresh = createInvoiceMocks();
	invoiceListItems.splice(0, invoiceListItems.length, ...fresh.listItems);
	invoiceDetailStore.clear();
	fresh.detailsById.forEach((detail, id) =>
		invoiceDetailStore.set(id, detail)
	);
	invoicePdfUrls.clear();
	nextInvoiceNumber = 1;
};
