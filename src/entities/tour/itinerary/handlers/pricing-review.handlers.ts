import { HttpResponse } from "msw";

import { createMockHandler } from "@/shared/api";

import {
	TOUR_SUMMARY_MOCK,
	isTourSummaryMockPair
} from "../mock/tour-summary.mock";

export const pricingReviewHandlers = [
	createMockHandler(
		{
			url: "/tour/:tourId/option/:optionId/summary",
			method: "GET"
		},
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
