import type {
	IReconciliation,
	IReconciliationBackend,
	IReconciliationDetail,
	IReconciliationDetailBackend,
	IReconciliationFilters,
	IReconciliationPaginatedResponse,
	IReconciliationPaginatedResponseBackend,
	IReconciliationSupplierPayment
} from "../types";

export const mapReconciliationToFrontend = (
	data: IReconciliationBackend
): IReconciliation => ({
	id: data.id,
	orderId: data.order_id,
	client: data.client,
	plannedRevenue: data.planned_revenue,
	actualRevenue: data.actual_revenue,
	plannedCost: data.planned_cost,
	actualCost: data.actual_cost,
	variance: data.variance,
	status: data.status,
	currency: data.currency
});

export const mapReconciliationDetailToFrontend = (
	data: IReconciliationDetailBackend
): IReconciliationDetail => ({
	...mapReconciliationToFrontend(data),
	plannedMargin: data.planned_margin,
	actualMargin: data.actual_margin,
	supplierPayments: data.supplier_payments.map(
		(p): IReconciliationSupplierPayment => ({
			id: p.id,
			component: p.component,
			plannedAmount: p.planned_amount,
			actualAmount: p.actual_amount,
			variance: p.variance
		})
	)
});

export const mapReconciliationFiltersToBackend = (
	filters: IReconciliationFilters
) => ({
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined,
	page: filters.page,
	limit: filters.limit
});

export const mapReconciliationPaginatedToFrontend = (
	data: IReconciliationPaginatedResponseBackend
): IReconciliationPaginatedResponse => ({
	data: data.data.map(mapReconciliationToFrontend),
	total: data.total,
	statusCounts: data.status_counts
});
