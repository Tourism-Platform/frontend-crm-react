import type {
	AnyEventWithCostOutput,
	TourMinMaxCostSchemaOutput,
	TourSummaryResponse
} from "@/shared/api";
import { formatToDollars } from "@/shared/utils";

import type {
	ITourReviewItem,
	ITourSummaryRange
} from "@/entities/tour/tour/types/tour-review.interface";

import { ENUM_EVENT_BACKEND, type ENUM_EVENT_BACKEND_TYPE } from "../types";
import { ENUM_EVENT } from "../types";
import type { ITourPricingReview } from "../types/pricing-review.types";

import { mapBackendTypToEventType } from "./event-type.converters";

const mapMinMaxCostToRange = (
	cost: TourMinMaxCostSchemaOutput
): ITourSummaryRange => ({
	from: cost.min.val,
	to: cost.max.val
});

const deriveProfitRange = (
	total: TourMinMaxCostSchemaOutput,
	cost: TourMinMaxCostSchemaOutput
): ITourSummaryRange => ({
	from: total.min.val - cost.max.val,
	to: total.max.val - cost.min.val
});

const mapMinMaxCostToDisplay = (cost: TourMinMaxCostSchemaOutput): string => {
	const min = cost.min.val;
	const max = cost.max.val;

	if (min === max) {
		return formatToDollars(min);
	}

	return `${formatToDollars(min)} - ${formatToDollars(max)}`;
};

const mapEventWithCostToReviewItem = (
	backend: AnyEventWithCostOutput
): ITourReviewItem => {
	const { event_id, event, cost, markup } = backend;
	const plannedCost = cost ? mapMinMaxCostToDisplay(cost) : "-";
	const estimatedRevenue = markup ? mapMinMaxCostToDisplay(markup) : "-";

	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return {
			id: event_id,
			item: "",
			supplier: "-",
			plannedCost,
			estimatedRevenue,
			type: ENUM_EVENT.MULTIPLY_OPTION,
			day: event.day,
			position: event.position,
			optionIndex: 0,
			subRows: (event.details ?? []).map((detail, index) => ({
				id: detail.id ?? `${event_id}:${index}`,
				item: detail.name ?? "-",
				supplier: detail.supplier_id ?? "-",
				plannedCost: "-",
				estimatedRevenue: "-",
				type: mapBackendTypToEventType(
					detail.typ as ENUM_EVENT_BACKEND_TYPE | undefined
				),
				day: event.day,
				position: event.position,
				optionIndex: index
			}))
		};
	}

	return {
		id: event_id,
		item: event.name ?? "",
		supplier: event.supplier_id ?? "-",
		plannedCost,
		estimatedRevenue,
		type: mapBackendTypToEventType(
			event.typ as ENUM_EVENT_BACKEND_TYPE | undefined
		),
		day: event.day,
		position: event.position,
		optionIndex: 0
	};
};

export const mapTourSummaryToFrontend = (
	backend: TourSummaryResponse
): ITourPricingReview => ({
	summary: {
		revenue: mapMinMaxCostToRange(backend.total),
		cost: mapMinMaxCostToRange(backend.cost),
		profit: deriveProfitRange(backend.total, backend.cost)
	},
	items: backend.events.map(mapEventWithCostToReviewItem)
});
