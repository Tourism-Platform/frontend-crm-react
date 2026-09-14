import { formatToDollars } from "@/shared/utils";

import type {
	ITourReviewItem,
	ITourSummaryRange
} from "@/entities/tour/tour/types/tour-review.interface";

import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type ITourPricingReview,
	type TGetTourSummaryBackendResponce,
	type TOperatorEventBackend,
	type TPackageBillableBackend,
	type TTourMinMaxCostBackend,
	type TTourSummaryEventBackend
} from "../types";

import { backendEventTypeMapper } from "./backend-event-type.converters";

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

const isPackageBillable = (
	item: TTourSummaryEventBackend
): item is TPackageBillableBackend => "package" in item;

const mapMinMaxCostToRange = (
	cost: TTourMinMaxCostBackend
): ITourSummaryRange => ({
	from: cost.min.val,
	to: cost.max.val
});

const mapMinMaxCostToDisplay = (cost: TTourMinMaxCostBackend): string => {
	const min = cost.min.val;
	const max = cost.max.val;

	if (min === max) {
		return formatToDollars(min);
	}

	return `${formatToDollars(min)} - ${formatToDollars(max)}`;
};

const mapEventPayloadToReviewItem = (
	eventId: string,
	event: TOperatorEventBackend,
	cost?: TTourMinMaxCostBackend,
	markup?: TTourMinMaxCostBackend
): ITourReviewItem => {
	const plannedCost = cost ? mapMinMaxCostToDisplay(cost) : "-";
	const estimatedRevenue = markup ? mapMinMaxCostToDisplay(markup) : "-";

	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return {
			id: eventId,
			item: "",
			supplier: "-",
			plannedCost,
			estimatedRevenue,
			type: ENUM_EVENT.MULTIPLY_OPTION,
			day: event.day,
			position: event.position,
			optionIndex: 0,
			subRows: (event.details ?? []).map((detail, index) => ({
				id: detail.id ?? `${eventId}:${index}`,
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
		id: eventId,
		item: event.name ?? "",
		supplier: resolveSupplierLabel(event.details.supply),
		plannedCost,
		estimatedRevenue,
		type: backendEventTypeMapper.to(event.typ as ENUM_EVENT_BACKEND_TYPE),
		day: event.day,
		position: event.position,
		optionIndex: 0
	};
};

const mapPackageToReviewItem = (
	backend: TPackageBillableBackend
): ITourReviewItem => {
	const subRows = backend.events.map((line) =>
		mapEventPayloadToReviewItem(line.event_id, line.event)
	);

	return {
		id: backend.package.id,
		item: backend.package.name,
		supplier: "-",
		plannedCost: mapMinMaxCostToDisplay(backend.cost),
		estimatedRevenue: mapMinMaxCostToDisplay(backend.markup),
		type: ENUM_EVENT.PACKAGE,
		day: 0,
		position: 0,
		optionIndex: 0,
		...(subRows.length ? { subRows } : {})
	};
};

export const mapTourSummaryToFrontend = (
	backend: TGetTourSummaryBackendResponce
): ITourPricingReview => ({
	summary: {
		// estimated_cost already includes fees (cost + fees); no top-level fees field
		revenue: mapMinMaxCostToRange(backend.estimated_revenue),
		cost: mapMinMaxCostToRange(backend.estimated_cost),
		profit: mapMinMaxCostToRange(backend.estimated_profit)
	},
	items: backend.events.map((item) =>
		isPackageBillable(item)
			? mapPackageToReviewItem(item)
			: mapEventPayloadToReviewItem(
					item.event_id,
					item.event,
					item.cost,
					item.markup
				)
	)
});
