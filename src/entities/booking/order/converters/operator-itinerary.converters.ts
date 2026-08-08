import type {
	OperatorItineraryEventOutput,
	OperatorItineraryPackageOutput,
	TourMinMaxCostSchemaOutput
} from "@/shared/api";
import { formatToDollars } from "@/shared/utils";

import { ENUM_EVENT } from "@/entities/tour";
import { mapBackendTypToEventType } from "@/entities/tour/itinerary/converters/event-type.converters";
import type { ENUM_EVENT_BACKEND_TYPE } from "@/entities/tour/itinerary/types";

import type {
	IBookingEventAvailability,
	IOrderTourReviewItem,
	IOrderTourReviewSummaryAmounts,
	TOperatorBookingItineraryBackend,
	TOperatorOrderOverviewBackend
} from "../types";

const formatCost = (cost: TourMinMaxCostSchemaOutput): string => {
	const { min, max } = cost;
	if (min.val === max.val) return formatToDollars(min.val);
	return `${formatToDollars(min.val)} - ${formatToDollars(max.val)}`;
};

const formatRevenue = (
	cost: TourMinMaxCostSchemaOutput,
	markup: TourMinMaxCostSchemaOutput,
	fees: TourMinMaxCostSchemaOutput
): string =>
	formatCost({
		min: {
			val: cost.min.val + markup.min.val + fees.min.val,
			currency: cost.min.currency
		},
		max: {
			val: cost.max.val + markup.max.val + fees.max.val,
			currency: cost.max.currency
		}
	});

const mapEventToItem = (
	backend: OperatorItineraryEventOutput
): IOrderTourReviewItem => {
	const { event_id, event, cost, markup, fees, selected_option_index } =
		backend;
	const plannedCost = formatCost(cost);
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
				supplier: detail.supplier_id ?? "-",
				plannedCost: "-",
				estimatedRevenue: "-",
				type: mapBackendTypToEventType(
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
		supplier: event.supplier_id ?? "-",
		plannedCost,
		estimatedRevenue,
		type: mapBackendTypToEventType(
			event.typ as ENUM_EVENT_BACKEND_TYPE | undefined
		),
		day: event.day,
		position: event.position,
		optionIndex: selected_option_index ?? 0
	};
};

const mapPackageToItem = (
	pkg: OperatorItineraryPackageOutput
): IOrderTourReviewItem => ({
	id: pkg.package_id,
	item: pkg.name,
	supplier: "-",
	plannedCost: formatCost(pkg.cost),
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

export const mapOperatorOverviewToTourReviewSummary = (
	data: TOperatorOrderOverviewBackend
): IOrderTourReviewSummaryAmounts => ({
	kind: "amounts",
	revenue: Number(data.revenue) || 0,
	profit: Number(data.expected_profit) || 0,
	paid: Number(data.paid) || 0,
	unpaid: Number(data.not_paid) || 0
});

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
