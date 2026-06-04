import {
	type InvoiceDetailResponse,
	type InvoiceListItem,
	type InvoiceListResponse,
	InvoiceStatus
} from "@/shared/api";
import { formatDate } from "@/shared/utils";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import { INVOICE_NO_DATA } from "../constants";
import type {
	IInvoice,
	IInvoiceDetail,
	IInvoiceFilters,
	IInvoicePaginatedResponse,
	TInvoiceStatusCounts
} from "../types";

type TInvoiceListResponseInput = InvoiceListResponse & {
	status_counts?: Partial<Record<InvoiceStatus, number>>;
};

const parseAmount = (value: string | number): number => {
	if (typeof value === "number") {
		return Number.isFinite(value) ? value : 0;
	}

	const cleaned = value.replace(/^\+/, "").trim();
	const parsed = Number.parseFloat(cleaned);

	return Number.isFinite(parsed) ? parsed : 0;
};

const emptyBilling = () => ({
	company: INVOICE_NO_DATA,
	address: INVOICE_NO_DATA,
	contact: INVOICE_NO_DATA,
	email: INVOICE_NO_DATA,
	phone: INVOICE_NO_DATA
});

const emptyBookingInfo = () => ({
	tour: INVOICE_NO_DATA,
	pax: 0,
	dates: INVOICE_NO_DATA,
	duration: INVOICE_NO_DATA
});

const emptyStatusCounts = (): TInvoiceStatusCounts =>
	Object.values(InvoiceStatus).reduce((acc, status) => {
		acc[status] = 0;
		return acc;
	}, {} as TInvoiceStatusCounts);

const mapStatusCounts = (
	counts?: Partial<Record<InvoiceStatus, number>>
): TInvoiceStatusCounts => {
	if (!counts) {
		return emptyStatusCounts();
	}

	return Object.values(InvoiceStatus).reduce((acc, status) => {
		acc[status] = counts[status] ?? 0;
		return acc;
	}, {} as TInvoiceStatusCounts);
};

export const mapInvoiceListItemToFrontend = (
	data: InvoiceListItem
): IInvoice => ({
	id: data.id,
	paymentId: data.invoice_number,
	orderId: data.order_number ?? INVOICE_NO_DATA,
	issueDate: data.issue_date ? formatDate(data.issue_date) : INVOICE_NO_DATA,
	amount: data.total_amount,
	paidAmount: data.paid_amount,
	status: data.status
});

export const mapInvoiceDetailToFrontend = (
	data: InvoiceDetailResponse
): IInvoiceDetail => ({
	id: data.id,
	paymentId: data.invoice_number,
	orderId: data.order_number ?? INVOICE_NO_DATA,
	issueDate: data.issued_at ? formatDate(data.issued_at) : INVOICE_NO_DATA,
	amount: parseAmount(data.total),
	paidAmount: parseAmount(data.paid_amount),
	status: data.status,
	dueDate: INVOICE_NO_DATA,
	remainingAmount: parseAmount(data.balance),
	currency: data.currency as ENUM_CURRENCY_OPTIONS_TYPE,
	billingInfo: emptyBilling(),
	bookingInfo: emptyBookingInfo(),
	payments: [],
	file: undefined
});

export const mapInvoiceListToFrontend = (data: InvoiceListItem[]): IInvoice[] =>
	data.map(mapInvoiceListItemToFrontend);

export const mapInvoicePaginatedToFrontend = (
	response: TInvoiceListResponseInput
): IInvoicePaginatedResponse => ({
	data: mapInvoiceListToFrontend(response.data),
	total: response.total_count,
	statusCounts: mapStatusCounts(response.status_counts)
});

export const mapInvoiceFiltersToBackend = (filters: IInvoiceFilters) => ({
	skip: (filters.page - 1) * filters.limit,
	limit: filters.limit,
	q: filters.search.trim() || undefined,
	statuses: filters.status.length > 0 ? filters.status : undefined
});
