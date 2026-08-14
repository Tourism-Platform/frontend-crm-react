import { HttpResponse } from "msw";

import { ApplyAvailabilityInput, createMockHandler } from "@/shared/api";

import {
	getBookingAvailabilityList,
	updateBookingAvailabilityRow
} from "../mock/booking-order-availability.mock";

export const bookingAvailabilityHandlers = [
	createMockHandler(
		{
			url: "/booking/order/:bookingId/availability",
			method: "GET"
		},
		async ({ params }) =>
			HttpResponse.json(
				getBookingAvailabilityList(String(params.bookingId))
			)
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId/events/:eventId/options/:optionIndex/availability",
			method: "PATCH"
		},
		async ({ params, body }) => {
			const bookingId = String(params.bookingId);
			const eventId = String(params.eventId);
			const optionIndex = Number(params.optionIndex);
			const { status } = body as { status: ApplyAvailabilityInput };

			const updated = updateBookingAvailabilityRow(
				bookingId,
				eventId,
				optionIndex,
				status
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	)
];
