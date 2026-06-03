import type {
	AnyEventWithCostOutput,
	MultipleOptionEventOutput,
	TourMinMaxCostSchemaOutput,
	TourSummaryResponse
} from "@/shared/api";
import { formatToDollars } from "@/shared/utils";

import type {
	ITourReviewItem,
	ITourSummaryRange
} from "@/entities/tour/tour/types/tour-review.interface";

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

const getEventKey = (event: { day: number; position: number; typ?: string }) =>
	`${event.day}-${event.position}-${event.typ ?? ""}`;

type TSummaryEvent = AnyEventWithCostOutput["event"];

const mapSummaryEventToReviewItem = (
	event: TSummaryEvent,
	cost?: TourMinMaxCostSchemaOutput,
	markup?: TourMinMaxCostSchemaOutput,
	idSuffix = ""
): ITourReviewItem => {
	if ("typ" in event && event.typ === "8") {
		const multi = event as MultipleOptionEventOutput;
		const parentId = getEventKey(multi);

		return {
			id: `${parentId}${idSuffix}`,
			item: multi.name ?? "",
			supplier: multi.supplier_id ?? "-",
			plannedCost: cost ? mapMinMaxCostToDisplay(cost) : "-",
			estimatedRevenue: markup ? mapMinMaxCostToDisplay(markup) : "-",
			type: ENUM_EVENT.MULTIPLY_OPTION,
			subRows: (multi.details ?? []).map((detail, index) =>
				mapSummaryEventToReviewItem(
					detail,
					undefined,
					undefined,
					`-${index}`
				)
			)
		};
	}

	const typ = "typ" in event ? event.typ : undefined;

	return {
		id: `${getEventKey(event as { day: number; position: number; typ?: string })}${idSuffix}`,
		item: (event as { name?: string | null }).name ?? "",
		supplier: (event as { supplier_id?: string | null }).supplier_id ?? "-",
		plannedCost: cost ? mapMinMaxCostToDisplay(cost) : "-",
		estimatedRevenue: markup ? mapMinMaxCostToDisplay(markup) : "-",
		type: mapBackendTypToEventType(typ)
	};
};

const mapEventWithCostToReviewItem = (
	backend: AnyEventWithCostOutput,
	index: number
): ITourReviewItem => {
	const item = mapSummaryEventToReviewItem(
		backend.event,
		backend.cost,
		backend.markup
	);

	return { ...item, id: item.id || String(index) };
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
