import type {
	IBookingEventAvailability,
	TBookingEventAvailabilityBackend
} from "../types";

export const mapBookingAvailabilityToFrontend = (
	data: TBookingEventAvailabilityBackend
): IBookingEventAvailability => ({
	id: data.id,
	bookingId: data.booking_id,
	eventId: data.event_id,
	optionIndex: data.option_index,
	status: data.status
});

export const mapBookingAvailabilityListToFrontend = (
	data: TBookingEventAvailabilityBackend[]
): IBookingEventAvailability[] => data.map(mapBookingAvailabilityToFrontend);
