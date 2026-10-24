import { HttpResponse } from "msw";

import {
	TOUR_OPTION_PATHS,
	createMockHandler,
	mockNotFound
} from "@/shared/api";

import { getTour } from "@/entities/tour/tour/mock/tour.store";

import { getTourOption, listTourEvents } from "../mock/itinerary.store";
import {
	ENUM_BREAKDOWN_LINE_KIND_BACKEND,
	ENUM_EXPENSE_TYPE_BACKEND,
	type TBreakdownLineBackend,
	type TGetPricingBreakdownBackendResponse,
	type TTourEventBackendResponce,
	type TTourSummaryEventBackend
} from "../types";

const range = (min: number, max: number) => ({
	min: { val: min },
	max: { val: max }
});

const line = (label: string | null, cost: number): TBreakdownLineBackend => ({
	kind: ENUM_BREAKDOWN_LINE_KIND_BACKEND.UNIT,
	label,
	unit_id: null,
	supply_id: null,
	pricing: ENUM_EXPENSE_TYPE_BACKEND.FIXED,
	rate: null,
	unit_cost: { val: cost },
	quantity: 1,
	pax: null,
	duration: null,
	fx_rate: null,
	cost: { val: cost },
	fee: { val: 0 },
	markup: { val: Math.round(cost * 0.1) }
});

const eventLabel = (event: TTourEventBackendResponce) =>
	event.event.typ === "options"
		? (event.event.details[0]?.name ?? null)
		: event.event.name;

/** Цена события детерминирована его позицией: min — 1 чел., max — группа */
const toBillable = (
	event: TTourEventBackendResponce,
	index: number
): TTourSummaryEventBackend => {
	const min = (index + 1) * 50;
	const max = Math.round(min * 1.4);

	return {
		event_id: event.id,
		typ: "individual_bill",
		event: event.event,
		cost: range(min, max),
		markup: range(Math.round(min * 0.1), Math.round(max * 0.1)),
		fees: range(0, 0),
		breakdown: {
			min: [line(eventLabel(event), min)],
			max: [line(eventLabel(event), max)]
		},
		warnings: []
	} as TTourSummaryEventBackend;
};

export const pricingReviewHandlers = [
	createMockHandler(
		TOUR_OPTION_PATHS.getPricingBreakdown(":tourId", ":optionId"),
		({ params }) => {
			const tourId = String(params.tourId);
			const optionId = String(params.optionId);
			if (!getTourOption(tourId, optionId)) {
				return mockNotFound("Tour option not found");
			}

			const events = listTourEvents(optionId).map(toBillable);
			const cost = events.reduce(
				(sum, event) => ({
					min: sum.min + event.cost.min.val,
					max: sum.max + event.cost.max.val
				}),
				{ min: 0, max: 0 }
			);
			const profit = { min: cost.min * 0.1, max: cost.max * 0.1 };
			const maxPax = getTour(tourId)?.group_size ?? 10;

			const response: TGetPricingBreakdownBackendResponse = {
				id: optionId,
				pax: { min: 1, max: maxPax },
				events,
				estimated_cost: range(cost.min, cost.max),
				estimated_profit: range(profit.min, profit.max),
				estimated_revenue: range(
					cost.min + profit.min,
					cost.max + profit.max
				),
				estimated_revenue_per_person: range(
					(cost.max + profit.max) / maxPax,
					cost.min + profit.min
				)
			};
			return HttpResponse.json(response);
		}
	)
];
