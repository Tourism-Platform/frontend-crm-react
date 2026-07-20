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

const parseOptionIndexFromSuffix = (idSuffix: string): number => {
	if (!idSuffix.startsWith("-")) return 0;
	const index = Number.parseInt(idSuffix.slice(1), 10);
	return Number.isNaN(index) ? 0 : index;
};

type TSummaryEvent = AnyEventWithCostOutput["event"];
type TNestedMultiDetail = NonNullable<
	MultipleOptionEventOutput["details"]
>[number];

const mapSummaryEventToReviewItem = (
	event: TSummaryEvent | TNestedMultiDetail,
	cost?: TourMinMaxCostSchemaOutput,
	markup?: TourMinMaxCostSchemaOutput,
	idSuffix = ""
): ITourReviewItem => {
	const optionIndex = parseOptionIndexFromSuffix(idSuffix);

	if (event.typ === "10") {
		const multi = event;
		const parentId = getEventKey(multi);

		return {
			id: `${parentId}${idSuffix}`,
			item: "",
			supplier: "-",
			plannedCost: cost ? mapMinMaxCostToDisplay(cost) : "-",
			estimatedRevenue: markup ? mapMinMaxCostToDisplay(markup) : "-",
			type: ENUM_EVENT.MULTIPLY_OPTION,
			day: multi.day,
			position: multi.position,
			optionIndex,
			subRows: (multi.details ?? []).map((detail, index) => {
				const subRow = mapSummaryEventToReviewItem(
					detail,
					undefined,
					undefined,
					`-${index}`
				);

				return {
					...subRow,
					day: multi.day,
					position: multi.position,
					optionIndex: index
				};
			})
		};
	}

	const typ = event.typ;
	const day = "day" in event ? event.day : 0;
	const position = "position" in event ? event.position : 0;

	return {
		id: `${getEventKey({ day, position, typ })}${idSuffix}`,
		item: event.name ?? "",
		supplier: event.supplier_id ?? "-",
		plannedCost: cost ? mapMinMaxCostToDisplay(cost) : "-",
		estimatedRevenue: markup ? mapMinMaxCostToDisplay(markup) : "-",
		type: mapBackendTypToEventType(typ),
		day,
		position,
		optionIndex
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
