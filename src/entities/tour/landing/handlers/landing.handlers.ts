import { HttpResponse } from "msw";

import {
	type LandingPageUpdate,
	TOUR_LANDING_PAGE_PATHS,
	createMockHandler
} from "@/shared/api";

import { TOUR_LANDING_MOCK } from "../mock/landing.mock";

export const tourLandingHandlers = [
	createMockHandler(TOUR_LANDING_PAGE_PATHS.getLandingPage(":tourId"), () =>
		HttpResponse.json(TOUR_LANDING_MOCK)
	),

	createMockHandler<LandingPageUpdate>(
		TOUR_LANDING_PAGE_PATHS.updateLandingPage(":tourId"),
		async ({ body }) => HttpResponse.json(body)
	)
];
