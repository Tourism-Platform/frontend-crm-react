import { HttpResponse } from "msw";

import { createMockHandler } from "@/shared/api";

import { PREVIEW_BOOKING_SUCCESS_MOCK } from "../mock/preview-booking.mock";

export const previewBookingHandlers = [
	createMockHandler<any>(
		{
			url: "/api/v1/tours/:tourId/booking/submit",
			method: "POST"
		},
		async () => HttpResponse.json(PREVIEW_BOOKING_SUCCESS_MOCK)
	)
];
