import { formatDate } from "@/shared/utils";

import type {
	ISupplierPayment,
	ISupplierPaymentBackend,
	ISupplierPaymentFilters,
	ISupplierPaymentPaginatedResponse,
	ISupplierPaymentPaginatedResponseBackend
} from "../types";

export const mapSupplierPaymentToFrontend = (
	data: ISupplierPaymentBackend
): ISupplierPayment => ({
	id: data.id,
	orderId: data.order_id,
	component: data.component,
	type: data.type,
	supplier: data.supplier,
	dateCreated: formatDate(data.date_created),
	amount: data.amount,
	currency: data.currency,
	manager: data.manager,
	status: data.status,
	note: data.note,
	files: data.files
});

export const mapSupplierPaymentToBackend = (
	data: Partial<ISupplierPayment>
): Partial<ISupplierPaymentBackend> => ({
	id: data.id,
	order_id: data.orderId,
	component: data.component,
	type: data.type,
	supplier: data.supplier,
	date_created: data.dateCreated,
	amount: data.amount,
	currency: data.currency,
	manager: data.manager,
	status: data.status,
	note: data.note,
	files: data.files
});

export const mapSupplierPaymentListToFrontend = (
	data: ISupplierPaymentBackend[]
): ISupplierPayment[] => data.map(mapSupplierPaymentToFrontend);

export const mapSupplierPaymentPaginatedToFrontend = (
	response: ISupplierPaymentPaginatedResponseBackend
): ISupplierPaymentPaginatedResponse => ({
	data: mapSupplierPaymentListToFrontend(response.data),
	total: response.total,
	statusCounts: response.status_counts
});

export const mapSupplierPaymentFiltersToBackend = (
	filters: ISupplierPaymentFilters
) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});
