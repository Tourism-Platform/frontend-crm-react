import type { BookingEventAvailabilityModel } from "@/shared/api";

import type { IBookingEventAvailability } from "../types/booking-availability.types";

export const mapBookingAvailabilityToFrontend = (
	data: BookingEventAvailabilityModel
): IBookingEventAvailability => ({
	id: data.id,
	bookingId: data.booking_id,
	eventId: data.event_id,
	optionIndex: data.option_index,
	status: data.status
});

export const mapBookingAvailabilityListToFrontend = (
	data: BookingEventAvailabilityModel[]
): IBookingEventAvailability[] => data.map(mapBookingAvailabilityToFrontend);
