import { formatDateToISO, parseDecimalSafe } from "@/shared/utils";

import { orderStatusMapper } from "@/entities/booking/order";

import type {
	IBookingFinancials,
	IBookingVariance,
	IEventVarianceLine,
	IReconciliation,
	IReconciliationFilters,
	IReconciliationPaginatedResponse,
	IReconciliationTotals,
	TBookingFinancialsBackend,
	TBookingVarianceBackend,
	TEventVarianceLineBackend,
	TReconciliationListBackend,
	TReconciliationListQuery,
	TReconciliationRowBackend,
	TReconciliationTotalsBackend
} from "../types";

const parseAmount = (value: string | number): number =>
	parseDecimalSafe(value).toNumber();

export const mapTotalsToFrontend = (
	totals: TReconciliationTotalsBackend
): IReconciliationTotals => ({
	revenueAccrued: parseAmount(totals.revenue_accrued),
	revenueSettled: parseAmount(totals.revenue_settled),
	receivable: parseAmount(totals.receivable),
	costAccrued: parseAmount(totals.cost_accrued),
	costSettled: parseAmount(totals.cost_settled),
	payable: parseAmount(totals.payable),
	settledProfit: parseAmount(totals.settled_profit),
	accrualProfit: parseAmount(totals.accrual_profit)
});

export const mapReconciliationToFrontend = (
	row: TReconciliationRowBackend
): IReconciliation => ({
	bookingId: row.booking_id,
	orderId: row.order_number,
	client: row.client_name,
	currency: String(row.currency),
	plannedRevenue: parseAmount(row.planned_revenue),
	plannedCost: parseAmount(row.planned_cost),
	plannedProfit: parseAmount(row.planned_profit),
	revenueAccrued: parseAmount(row.revenue_accrued),
	revenueSettled: parseAmount(row.revenue_settled),
	receivable: parseAmount(row.receivable),
	costAccrued: parseAmount(row.cost_accrued),
	costSettled: parseAmount(row.cost_settled),
	payable: parseAmount(row.payable),
	accrualProfit: parseAmount(row.accrual_profit),
	settledProfit: parseAmount(row.settled_profit),
	variance: parseAmount(row.variance),
	status: orderStatusMapper.from(row.status)!
});

export const mapReconciliationPaginatedToFrontend = (
	response: TReconciliationListBackend
): IReconciliationPaginatedResponse => ({
	data: response.data.map(mapReconciliationToFrontend),
	total: response.total_count,
	currency: String(response.currency),
	totals: mapTotalsToFrontend(response.totals)
});

export const mapReconciliationFiltersToBackend = (
	filters: IReconciliationFilters
): TReconciliationListQuery => {
	const search = filters.search.trim();

	return {
		skip: (filters.page - 1) * filters.limit,
		limit: filters.limit,
		status:
			filters.status.length > 0
				? orderStatusMapper.to(filters.status[0])
				: undefined,
		...(search ? { q: search } : {}),
		...(filters.tourId && { tour_id: filters.tourId }),
		...(filters.dateRange?.from && {
			date_from: formatDateToISO(filters.dateRange.from)
		}),
		...(filters.dateRange?.to && {
			date_to: formatDateToISO(filters.dateRange.to)
		}),
		...(filters.outstandingOnly && { outstanding_only: true }),
		...(filters.payableOnly && { payable_only: true })
	};
};

export const mapBookingFinancialsToFrontend = (
	data: TBookingFinancialsBackend
): IBookingFinancials => ({
	bookingId: data.booking_id,
	orderId: data.order_number,
	currency: String(data.currency),
	plannedRevenue: parseAmount(data.planned_revenue),
	plannedCost: parseAmount(data.planned_cost),
	plannedProfit: parseAmount(data.planned_profit),
	revenueAccrued: parseAmount(data.revenue_accrued),
	revenueSettled: parseAmount(data.revenue_settled),
	receivable: parseAmount(data.receivable),
	costAccrued: parseAmount(data.cost_accrued),
	costSettled: parseAmount(data.cost_settled),
	payable: parseAmount(data.payable),
	accrualProfit: parseAmount(data.accrual_profit),
	settledProfit: parseAmount(data.settled_profit)
});

export const mapEventVarianceLineToFrontend = (
	line: TEventVarianceLineBackend
): IEventVarianceLine => ({
	eventId: line.event_id,
	paymentId: line.payment_id,
	eventName: line.event_name ?? "",
	date: line.date,
	plannedMin: parseAmount(line.planned_min),
	plannedMax: parseAmount(line.planned_max),
	accrued: parseAmount(line.accrued),
	settled: parseAmount(line.settled),
	payable: parseAmount(line.payable),
	variance: parseAmount(line.variance)
});

export const mapBookingVarianceToFrontend = (
	data: TBookingVarianceBackend
): IBookingVariance => ({
	bookingId: data.booking_id,
	orderId: data.order_number,
	currency: String(data.currency),
	plannedTotalMin: parseAmount(data.planned_total_min),
	plannedTotalMax: parseAmount(data.planned_total_max),
	accruedTotal: parseAmount(data.accrued_total),
	settledTotal: parseAmount(data.settled_total),
	varianceTotal: parseAmount(data.variance_total),
	events: data.events.map(mapEventVarianceLineToFrontend)
});
