import { mapBackendTypToEventType } from "@/entities/tour/itinerary/converters/event-type.converters";
import type { ENUM_EVENT_BACKEND_TYPE } from "@/entities/tour/itinerary/types";

import type { TBookingEventAvailabilityBackend } from "../types";
import type { IBookingEventAvailability } from "../types/booking-availability.types";

import { availabilityStatusMapper } from "./availability-status.convert";

export const mapBookingAvailabilityToFrontend = (
	data: TBookingEventAvailabilityBackend
): IBookingEventAvailability => ({
	id: data.id,
	bookingId: data.booking_id,
	eventId: data.event_id,
	optionIndex: data.option_index,
	status: availabilityStatusMapper.from(data.status)!,
	eventName: data.event_name,
	eventType:
		mapBackendTypToEventType(
			data.event_typ as ENUM_EVENT_BACKEND_TYPE | null
		) ?? null
});

export const mapBookingAvailabilityListToFrontend = (
	data: TBookingEventAvailabilityBackend[]
): IBookingEventAvailability[] => data.map(mapBookingAvailabilityToFrontend);
