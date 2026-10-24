import { HttpResponse } from "msw";

import {
	BOOKING_AVAILABILITY_PATHS,
	createMockHandler,
	mockNotFound
} from "@/shared/api";

import { getBookingOrderDetail } from "../mock/booking-order.store";
import {
	applyAvailability,
	getAvailabilityRows
} from "../mock/booking-snapshot.store";
import type { ENUM_AVAILABILITY_STATUS_BACKEND_TYPE } from "../types";

export const bookingAvailabilityHandlers = [
	createMockHandler(
		BOOKING_AVAILABILITY_PATHS.listBookingAvailability(":bookingId"),
		({ params }) =>
			getBookingOrderDetail(String(params.bookingId))
				? HttpResponse.json(
						getAvailabilityRows(String(params.bookingId))
					)
				: mockNotFound("Booking not found")
	),

	createMockHandler(
		BOOKING_AVAILABILITY_PATHS.applyEventAvailability(
			":bookingId",
			":eventId",
			":optionIndex"
		),
		({ params, body }) => {
			const row = applyAvailability(
				String(params.bookingId),
				String(params.eventId),
				Number(params.optionIndex),
				body.status as unknown as ENUM_AVAILABILITY_STATUS_BACKEND_TYPE
			);
			return row
				? HttpResponse.json(row)
				: mockNotFound("Availability row not found");
		}
	)
];
