import { formatToDollars } from "@/shared/utils";

import {
	ENUM_EVENT,
	ENUM_PRICING_REVIEW_ROW,
	attachBreakdownToReviewItem,
	backendEventTypeMapper,
	isPricingReviewBreakdownRow
} from "@/entities/tour";
import type { ENUM_EVENT_BACKEND_TYPE } from "@/entities/tour";

import type {
	IBookingEventAvailability,
	IOrderTourReviewItem,
	TOperatorBookingItineraryBackend,
	TOperatorItineraryEventBackend,
	TOperatorItineraryPackageBackend,
	TTourMinMaxCostBackend
} from "../types";

/** Operator itinerary `cost` is supplier cost only (fees separate). Do not reuse tour-summary mappers — there `estimated_cost` already includes fees. */
const formatCostWithoutFees = (cost: TTourMinMaxCostBackend): string => {
	const { min, max } = cost;
	if (min.val === max.val) return formatToDollars(min.val);
	return `${formatToDollars(min.val)} - ${formatToDollars(max.val)}`;
};

const formatRevenue = (
	cost: TTourMinMaxCostBackend,
	markup: TTourMinMaxCostBackend,
	fees: TTourMinMaxCostBackend
): string =>
	formatCostWithoutFees({
		min: {
			val: cost.min.val + markup.min.val + fees.min.val,
			currency: cost.min.currency
		},
		max: {
			val: cost.max.val + markup.max.val + fees.max.val,
			currency: cost.max.currency
		}
	});

/**
 * Supplier label for display (contract 3.1): a linked product carries the
 * resolved `supplier` ref; inline supply only has `supplier_id`.
 */
const resolveSupplierLabel = (
	supply:
		| { source: "inline"; supplier_id?: string | null }
		| { source: "product"; supplier: { id: string; name: string } }
): string => {
	if (supply.source === "product") {
		return supply.supplier.name || supply.supplier.id;
	}
	return supply.supplier_id ?? "-";
};

const toOrderReviewItem = (
	item: ReturnType<typeof attachBreakdownToReviewItem>,
	eventId?: string
): IOrderTourReviewItem => ({
	...item,
	eventId: isPricingReviewBreakdownRow(item) ? undefined : eventId,
	subRows: item.subRows?.map((sub) => toOrderReviewItem(sub, eventId))
});

const mapEventToItem = (
	backend: TOperatorItineraryEventBackend
): IOrderTourReviewItem => {
	const { event_id, event, cost, markup, fees, selected_option_index } =
		backend;
	const plannedCost = formatCostWithoutFees(cost);
	const estimatedRevenue = formatRevenue(cost, markup, fees);

	const base =
		event.typ === "options"
			? {
					id: event_id,
					eventId: event_id,
					item: "",
					supplier: "-",
					plannedCost,
					estimatedRevenue,
					type: ENUM_EVENT.MULTIPLY_OPTION,
					day: event.day,
					position: event.position,
					optionIndex: 0,
					rowKind: ENUM_PRICING_REVIEW_ROW.EVENT,
					subRows: (event.details ?? []).map((detail, index) => ({
						id: `${event_id}:${index}`,
						eventId: event_id,
						item: detail.name ?? "-",
						supplier: resolveSupplierLabel(detail.details.supply),
						plannedCost: "-",
						estimatedRevenue: "-",
						type: backendEventTypeMapper.to(
							detail.typ as ENUM_EVENT_BACKEND_TYPE
						),
						day: event.day,
						position: event.position,
						optionIndex: index,
						rowKind: ENUM_PRICING_REVIEW_ROW.EVENT
					}))
				}
			: {
					id: event_id,
					eventId: event_id,
					item: event.name ?? "-",
					supplier: resolveSupplierLabel(event.details.supply),
					plannedCost,
					estimatedRevenue,
					type: backendEventTypeMapper.to(
						event.typ as ENUM_EVENT_BACKEND_TYPE
					),
					day: event.day,
					position: event.position,
					optionIndex: selected_option_index ?? 0,
					rowKind: ENUM_PRICING_REVIEW_ROW.EVENT
				};

	return toOrderReviewItem(
		attachBreakdownToReviewItem(base, backend.breakdown, backend.warnings),
		event_id
	);
};

const mapPackageToItem = (
	pkg: TOperatorItineraryPackageBackend
): IOrderTourReviewItem =>
	toOrderReviewItem(
		attachBreakdownToReviewItem(
			{
				id: pkg.package_id,
				item: pkg.name,
				supplier: "-",
				plannedCost: formatCostWithoutFees(pkg.cost),
				estimatedRevenue: formatRevenue(pkg.cost, pkg.markup, pkg.fees),
				day: 0,
				position: 0,
				optionIndex: 0,
				rowKind: ENUM_PRICING_REVIEW_ROW.EVENT
			},
			pkg.breakdown
		)
	);

export const mapOperatorItineraryToTourReviewItems = (
	data?: TOperatorBookingItineraryBackend
): IOrderTourReviewItem[] => {
	if (!data) return [];

	return [
		...data.events.map(mapEventToItem),
		...data.packages.map(mapPackageToItem)
	];
};

const findAvailability = (
	availability: IBookingEventAvailability[],
	eventId?: string,
	optionIndex = 0
): IBookingEventAvailability | undefined => {
	if (!eventId) return undefined;

	return availability.find(
		(row) => row.eventId === eventId && row.optionIndex === optionIndex
	);
};

const attachAvailabilityToItem = (
	item: IOrderTourReviewItem,
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem => {
	const next: IOrderTourReviewItem = {
		...item,
		subRows: item.subRows?.map((sub) =>
			attachAvailabilityToItem(sub, availability)
		)
	};

	if (isPricingReviewBreakdownRow(item)) {
		return next;
	}

	return {
		...next,
		availability: findAvailability(
			availability,
			item.eventId,
			item.optionIndex
		)
	};
};

export const attachAvailabilityToItineraryItems = (
	items: IOrderTourReviewItem[],
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem[] =>
	items.map((item) => attachAvailabilityToItem(item, availability));
