import { HttpResponse } from "msw";

import {
	ApplyAvailabilityInput,
	AvailabilityStatus,
	createMockHandler
} from "@/shared/api";

import {
	getBookingAvailabilityList,
	updateBookingAvailabilityRow
} from "../mock/booking-order-availability.mock";

const mapApplyToAvailabilityStatus = (
	input: ApplyAvailabilityInput
): AvailabilityStatus => {
	switch (input) {
		case ApplyAvailabilityInput.Available:
			return AvailabilityStatus.Selected;
		case ApplyAvailabilityInput.Unavailable:
			return AvailabilityStatus.Unavailable;
		default:
			return AvailabilityStatus.Pending;
	}
};

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
			const nextStatus = mapApplyToAvailabilityStatus(status);

			const updated = updateBookingAvailabilityRow(
				bookingId,
				eventId,
				optionIndex,
				nextStatus
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(updated);
		}
	)
];
