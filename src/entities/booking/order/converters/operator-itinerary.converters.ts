import { formatToDollars } from "@/shared/utils";

import { ENUM_EVENT } from "@/entities/tour";
import { backendEventTypeMapper } from "@/entities/tour/itinerary/converters/backend-event-type.converters";
import type { ENUM_EVENT_BACKEND_TYPE } from "@/entities/tour/itinerary/types";

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

const mapEventToItem = (
	backend: TOperatorItineraryEventBackend
): IOrderTourReviewItem => {
	const { event_id, event, cost, markup, fees, selected_option_index } =
		backend;
	const plannedCost = formatCostWithoutFees(cost);
	const estimatedRevenue = formatRevenue(cost, markup, fees);

	if (event.typ === "options") {
		return {
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
				optionIndex: index
			}))
		};
	}

	return {
		id: event_id,
		eventId: event_id,
		item: event.name ?? "-",
		supplier: resolveSupplierLabel(event.details.supply),
		plannedCost,
		estimatedRevenue,
		type: backendEventTypeMapper.to(event.typ as ENUM_EVENT_BACKEND_TYPE),
		day: event.day,
		position: event.position,
		optionIndex: selected_option_index ?? 0
	};
};

const mapPackageToItem = (
	pkg: TOperatorItineraryPackageBackend
): IOrderTourReviewItem => ({
	id: pkg.package_id,
	item: pkg.name,
	supplier: "-",
	plannedCost: formatCostWithoutFees(pkg.cost),
	estimatedRevenue: formatRevenue(pkg.cost, pkg.markup, pkg.fees),
	day: 0,
	position: 0,
	optionIndex: 0
});

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

export const attachAvailabilityToItineraryItems = (
	items: IOrderTourReviewItem[],
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem[] =>
	items.map((item) => {
		if (item.subRows?.length) {
			return {
				...item,
				subRows: item.subRows.map((sub) => ({
					...sub,
					availability: findAvailability(
						availability,
						sub.eventId,
						sub.optionIndex
					)
				}))
			};
		}

		return {
			...item,
			availability: findAvailability(
				availability,
				item.eventId,
				item.optionIndex
			)
		};
	});
