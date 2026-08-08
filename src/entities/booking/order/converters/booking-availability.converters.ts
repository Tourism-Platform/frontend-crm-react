import { ENUM_EVENT } from "@/entities/tour";
import { mapBackendTypToEventType } from "@/entities/tour/itinerary/converters/event-type.converters";
import type { ENUM_EVENT_BACKEND_TYPE } from "@/entities/tour/itinerary/types";

import type { TBookingEventAvailabilityBackend } from "../types";
import type { IBookingEventAvailability } from "../types/booking-availability.types";
import type { IOrderTourReviewItem } from "../types/order-tour-review.types";

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

const mapRowToReviewItem = (
	row: IBookingEventAvailability
): IOrderTourReviewItem => ({
	id: row.id,
	item: row.eventName ?? "-",
	supplier: "-",
	plannedCost: "-",
	estimatedRevenue: "-",
	type: row.eventType ?? undefined,
	day: 0,
	position: 0,
	optionIndex: row.optionIndex,
	eventId: row.eventId,
	availability: row
});

export const mapAvailabilityToTourReviewItems = (
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem[] => {
	const order: string[] = [];
	const groups = new Map<string, IBookingEventAvailability[]>();

	for (const row of availability) {
		if (!groups.has(row.eventId)) {
			order.push(row.eventId);
			groups.set(row.eventId, []);
		}
		groups.get(row.eventId)!.push(row);
	}

	return order.map((eventId) => {
		const rows = groups
			.get(eventId)!
			.sort((a, b) => a.optionIndex - b.optionIndex);

		if (rows.length === 1) {
			return mapRowToReviewItem(rows[0]);
		}

		return {
			id: eventId,
			item: "",
			supplier: "-",
			plannedCost: "-",
			estimatedRevenue: "-",
			type: ENUM_EVENT.MULTIPLY_OPTION,
			day: 0,
			position: 0,
			optionIndex: 0,
			eventId,
			subRows: rows.map(mapRowToReviewItem)
		};
	});
};
