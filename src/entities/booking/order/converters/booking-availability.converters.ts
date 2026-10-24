import {
	eventBoardTypeMapper,
	eventKindMapper
} from "@/entities/tour/itinerary";

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
		eventBoardTypeMapper.to(eventKindMapper.from(data.event_typ)) ?? null
});

export const mapBookingAvailabilityListToFrontend = (
	data: TBookingEventAvailabilityBackend[]
): IBookingEventAvailability[] => data.map(mapBookingAvailabilityToFrontend);
