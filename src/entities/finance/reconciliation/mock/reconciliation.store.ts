import {
	type BookingFinancialsResponse,
	type BookingReconciliationRowOutput,
	Currency,
	EventTypes,
	type EventVarianceResponse
} from "@/shared/api/generated/Api";

import type { TReconciliationListBackend } from "../types";

import {
	buildLinkedEventUuid,
	buildLinkedSupplierPaymentUuid
} from "./reconciliation.mock.constants";
import { createReconciliationMocks } from "./reconciliation.mock.factory";

const rows: BookingReconciliationRowOutput[] = createReconciliationMocks();

export interface IListReconciliationsQuery {
	status: string | null;
	q: string | null;
	skip: number;
	limit: number;
}

const filterRows = ({
	status,
	q
}: Pick<
	IListReconciliationsQuery,
	"status" | "q"
>): BookingReconciliationRowOutput[] => {
	let filtered = [...rows];

	if (status) {
		filtered = filtered.filter((row) => row.status === status);
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter(
			(row) =>
				row.booking_id.toLowerCase().includes(query) ||
				row.order_number.toLowerCase().includes(query) ||
				row.client_name.toLowerCase().includes(query) ||
				(row.tour_name?.toLowerCase().includes(query) ?? false)
		);
	}

	return filtered;
};

const sumField = (
	items: BookingReconciliationRowOutput[],
	key: keyof Pick<
		BookingReconciliationRowOutput,
		| "revenue_accrued"
		| "revenue_settled"
		| "receivable"
		| "cost_accrued"
		| "cost_settled"
		| "payable"
		| "settled_profit"
		| "accrual_profit"
	>
): string => {
	const total = items.reduce((acc, item) => acc + Number(item[key]), 0);
	return total.toFixed(2);
};

const computeTotals = (
	items: BookingReconciliationRowOutput[]
): TReconciliationListBackend["totals"] => ({
	revenue_accrued: sumField(items, "revenue_accrued"),
	revenue_settled: sumField(items, "revenue_settled"),
	receivable: sumField(items, "receivable"),
	cost_accrued: sumField(items, "cost_accrued"),
	cost_settled: sumField(items, "cost_settled"),
	payable: sumField(items, "payable"),
	settled_profit: sumField(items, "settled_profit"),
	accrual_profit: sumField(items, "accrual_profit")
});

export const listReconciliationsFromUrl = (
	url: URL
): TReconciliationListBackend => {
	const status = url.searchParams.get("status");
	const q = url.searchParams.get("q");
	const skip = Number(url.searchParams.get("skip") || 0);
	const limit = Number(url.searchParams.get("limit") || 10);

	const filtered = filterRows({ status, q });
	const data = filtered.slice(skip, skip + limit);

	return {
		total_count: filtered.length,
		currency: Currency.USD,
		totals: computeTotals(filtered),
		data
	};
};

const toAmount = (value: number): string => value.toFixed(2);

const buildFinancials = (
	row: BookingReconciliationRowOutput
): BookingFinancialsResponse => ({
	booking_id: row.booking_id,
	order_number: row.order_number,
	currency: row.currency,
	planned_revenue: String(row.planned_revenue),
	planned_cost: String(row.planned_cost),
	planned_profit: String(row.planned_profit),
	revenue_accrued: String(row.revenue_accrued),
	revenue_settled: String(row.revenue_settled),
	receivable: String(row.receivable),
	cost_accrued: String(row.cost_accrued),
	cost_settled: String(row.cost_settled),
	payable: String(row.payable),
	accrual_profit: String(row.accrual_profit),
	settled_profit: String(row.settled_profit)
});

const buildVariance = (
	row: BookingReconciliationRowOutput,
	index: number
): EventVarianceResponse => {
	const plannedCost = Number(row.planned_cost);
	const costAccrued = Number(row.cost_accrued);
	const costSettled = Number(row.cost_settled);

	const hotelPlanned = plannedCost * 0.6;
	const hotelAccrued = costAccrued * 0.6;
	const hotelSettled = costSettled * 0.6;
	const transportPlanned = plannedCost * 0.4;
	const transportAccrued = costAccrued * 0.4;
	const transportSettled = costSettled * 0.4;

	const paymentIdHotel = buildLinkedSupplierPaymentUuid((index % 21) + 1);
	const paymentIdTransport =
		index % 2 === 0
			? buildLinkedSupplierPaymentUuid(((index + 1) % 21) + 1)
			: null;

	const events = [
		{
			event_id: buildLinkedEventUuid(index * 2 + 1),
			payment_id: paymentIdHotel,
			event_name: "Hotel Accommodation",
			event_typ: EventTypes.Housing,
			date: row.date,
			planned_min: toAmount(hotelPlanned * 0.9),
			planned_max: toAmount(hotelPlanned),
			accrued: toAmount(hotelAccrued),
			settled: toAmount(hotelSettled),
			payable: toAmount(Math.max(hotelAccrued - hotelSettled, 0)),
			variance: toAmount(hotelPlanned - hotelAccrued)
		},
		{
			event_id: buildLinkedEventUuid(index * 2 + 2),
			payment_id: paymentIdTransport,
			event_name: "Transportation",
			event_typ: EventTypes.Transfer,
			date: row.date,
			planned_min: toAmount(transportPlanned * 0.9),
			planned_max: toAmount(transportPlanned),
			accrued: toAmount(transportAccrued),
			settled: toAmount(transportSettled),
			payable: toAmount(Math.max(transportAccrued - transportSettled, 0)),
			variance: toAmount(transportPlanned - transportAccrued)
		}
	];

	return {
		booking_id: row.booking_id,
		order_number: row.order_number,
		currency: row.currency,
		planned_total_min: toAmount(plannedCost * 0.9),
		planned_total_max: toAmount(plannedCost),
		accrued_total: toAmount(costAccrued),
		settled_total: toAmount(costSettled),
		variance_total: String(row.variance),
		events
	};
};

export const RECONCILIATION_FINANCIALS_MAP: Record<
	string,
	BookingFinancialsResponse
> = Object.fromEntries(
	rows.map((row) => [row.booking_id, buildFinancials(row)])
);

export const RECONCILIATION_VARIANCE_MAP: Record<
	string,
	EventVarianceResponse
> = Object.fromEntries(
	rows.map((row, index) => [row.booking_id, buildVariance(row, index)])
);

export const getReconciliationFinancials = (
	bookingId: string
): BookingFinancialsResponse | undefined =>
	RECONCILIATION_FINANCIALS_MAP[bookingId];

export const getReconciliationVariance = (
	bookingId: string
): EventVarianceResponse | undefined => RECONCILIATION_VARIANCE_MAP[bookingId];
