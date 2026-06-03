import { HttpResponse } from "msw";

import { TOUR_PUBLIC_PATHS, createMockHandler } from "@/shared/api";

import {
	PREVIEW_OPERATOR_MOCK,
	PREVIEW_OPTION_DETAIL_MOCK,
	PREVIEW_TOUR_GENERAL_MOCK,
	TOUR_PREVIEW_TOUR_MOCK
} from "../mock";

export const tourPreviewTourHandlers = [
	createMockHandler(TOUR_PUBLIC_PATHS.getTour(":tourId"), () =>
		HttpResponse.json(PREVIEW_TOUR_GENERAL_MOCK)
	),
	createMockHandler(TOUR_PUBLIC_PATHS.getPublicLandingPage(":tourId"), () =>
		HttpResponse.json(TOUR_PREVIEW_TOUR_MOCK)
	),
	createMockHandler(
		TOUR_PUBLIC_PATHS.getPublicOperatorPreview(":tourId"),
		() => HttpResponse.json(PREVIEW_OPERATOR_MOCK)
	),
	createMockHandler(
		TOUR_PUBLIC_PATHS.getPublicTourOption(":tourId", ":optionId"),
		() => HttpResponse.json(PREVIEW_OPTION_DETAIL_MOCK)
	)
];
