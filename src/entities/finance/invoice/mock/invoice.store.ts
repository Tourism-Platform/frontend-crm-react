import {
	type InvoiceDetailResponse,
	type InvoiceListItem,
	type InvoiceListResponse,
	InvoiceStatus
} from "@/shared/api";

import { createInvoiceMocks } from "./invoice.mock.factory";

const { listItems, detailsById } = createInvoiceMocks();

export const invoiceListItems: InvoiceListItem[] = listItems;
export const invoiceDetailStore = detailsById;

export const getInvoiceDetail = (
	invoiceId: string
): InvoiceDetailResponse | undefined => invoiceDetailStore.get(invoiceId);

export interface IListInvoicesQuery {
	statuses: string[];
	q: string | null;
	skip: number;
	limit: number;
}

const filterInvoiceItems = ({
	statuses,
	q
}: Pick<IListInvoicesQuery, "statuses" | "q">): InvoiceListItem[] => {
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
	items: InvoiceListItem[]
): Record<InvoiceStatus, number> => {
	const counts = Object.values(InvoiceStatus).reduce(
		(acc, status) => {
			acc[status] = 0;
			return acc;
		},
		{} as Record<InvoiceStatus, number>
	);

	for (const item of items) {
		counts[item.status] += 1;
	}

	return counts;
};

export const listInvoicesFromUrl = (
	url: URL
): InvoiceListResponse & {
	status_counts: Record<InvoiceStatus, number>;
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
}: IListInvoicesQuery): InvoiceListResponse => {
	const filtered = filterInvoiceItems({ statuses, q });
	const data = filtered.slice(skip, skip + limit);

	return { total_count: filtered.length, data };
};

export const listInvoicesWithStatusCounts = (
	query: IListInvoicesQuery
): InvoiceListResponse & {
	status_counts: Record<InvoiceStatus, number>;
} => {
	const filtered = filterInvoiceItems(query);
	const data = filtered.slice(query.skip, query.skip + query.limit);

	return {
		total_count: filtered.length,
		data,
		status_counts: computeStatusCounts(filtered)
	};
};
