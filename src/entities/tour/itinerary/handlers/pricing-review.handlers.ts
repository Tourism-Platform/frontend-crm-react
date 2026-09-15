import { HttpResponse } from "msw";

import { TOUR_OPTION_PATHS, createMockHandler } from "@/shared/api";

import {
	TOUR_SUMMARY_MOCK,
	isTourSummaryMockPair
} from "../mock/tour-summary.mock";

export const pricingReviewHandlers = [
	createMockHandler(
		TOUR_OPTION_PATHS.getPricingBreakdown(":tourId", ":optionId"),
		async ({ params }) => {
			const tourId = String(params.tourId);
			const optionId = String(params.optionId);

			if (!isTourSummaryMockPair(tourId, optionId)) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(TOUR_SUMMARY_MOCK);
		}
	)
];
