import { AvailabilityStatus } from "@/shared/api";

import { ENUM_EVENT, eventTypeMapper } from "@/entities/tour";
import type { ITourEvent } from "@/entities/tour/itinerary/types/event.types";
import type { ITourReviewItem } from "@/entities/tour/tour/types/tour-review.interface";

import type { IBookingEventAvailability } from "../types/booking-availability.types";
import type { IOrderTourReviewItem } from "../types/order-tour-review.types";

type TAvailabilityEventGroup = {
	eventId: string;
	rows: IBookingEventAvailability[];
};

const parseBackendTypFromReviewId = (id: string): string | undefined => {
	const match = /^(\d+)-(\d+)-(\d+)/.exec(id);
	return match?.[3];
};

const groupAvailabilityByEventId = (
	availability: IBookingEventAvailability[]
): TAvailabilityEventGroup[] => {
	const order: string[] = [];
	const map = new Map<string, IBookingEventAvailability[]>();

	for (const row of availability) {
		if (!map.has(row.eventId)) {
			order.push(row.eventId);
			map.set(row.eventId, []);
		}
		map.get(row.eventId)!.push(row);
	}

	return order.map((eventId) => ({
		eventId,
		rows: map.get(eventId)!.sort((a, b) => a.optionIndex - b.optionIndex)
	}));
};

const findTourEvent = (
	events: ITourEvent[],
	day: number,
	position: number,
	eventType?: ITourReviewItem["type"],
	reviewId?: string
): ITourEvent | undefined => {
	const atPosition = events.filter(
		(event) => event.day === day && event.position === position
	);

	if (!atPosition.length) return undefined;

	if (eventType) {
		const byType = atPosition.find(
			(event) => event.eventType === eventType
		);
		if (byType) return byType;
	}

	const backendTyp = reviewId
		? parseBackendTypFromReviewId(reviewId)
		: undefined;

	if (backendTyp) {
		const byBackendTyp = atPosition.find(
			(event) => eventTypeMapper.to(event.eventType) === backendTyp
		);
		if (byBackendTyp) return byBackendTyp;
	}

	return atPosition.length === 1 ? atPosition[0] : undefined;
};

const findAvailabilityStatus = (
	availability: IBookingEventAvailability[],
	eventId: string,
	optionIndex: number
): AvailabilityStatus | undefined =>
	availability.find(
		(row) => row.eventId === eventId && row.optionIndex === optionIndex
	)?.status;

const enrichRow = (
	item: IOrderTourReviewItem,
	eventId: string | undefined,
	optionIndex: number,
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem => {
	if (!eventId) {
		return { ...item, optionIndex };
	}

	const availabilityStatus = findAvailabilityStatus(
		availability,
		eventId,
		optionIndex
	);

	return {
		...item,
		eventId,
		optionIndex,
		availabilityStatus,
		isApplied: availabilityStatus === AvailabilityStatus.Selected
	};
};

const mergeMultiplyItemWithTourEvents = (
	item: IOrderTourReviewItem,
	tourEvents: ITourEvent[],
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem => {
	const parentEvent = findTourEvent(
		tourEvents,
		item.day,
		item.position,
		ENUM_EVENT.MULTIPLY_OPTION,
		item.id
	);
	const parentEventId = parentEvent?.id;

	return {
		...item,
		eventId: parentEventId,
		optionIndex: 0,
		subRows: item.subRows?.map((subRow, index) =>
			enrichRow(subRow, parentEventId, index, availability)
		)
	};
};

const mergeSingularItemWithTourEvents = (
	item: IOrderTourReviewItem,
	tourEvents: ITourEvent[],
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem => {
	const tourEvent = findTourEvent(
		tourEvents,
		item.day,
		item.position,
		item.type,
		item.id
	);

	return enrichRow(item, tourEvent?.id, 0, availability);
};

const mergeItemWithTourEvents = (
	item: IOrderTourReviewItem,
	tourEvents: ITourEvent[],
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem => {
	if (item.type === ENUM_EVENT.MULTIPLY_OPTION) {
		return mergeMultiplyItemWithTourEvents(item, tourEvents, availability);
	}

	return mergeSingularItemWithTourEvents(item, tourEvents, availability);
};

const mergeItemWithAvailabilityGroup = (
	item: IOrderTourReviewItem,
	group: TAvailabilityEventGroup | undefined,
	availability: IBookingEventAvailability[]
): IOrderTourReviewItem => {
	if (!group) {
		return { ...item, optionIndex: item.optionIndex ?? 0 };
	}

	if (item.type === ENUM_EVENT.MULTIPLY_OPTION) {
		return {
			...item,
			eventId: group.eventId,
			optionIndex: 0,
			subRows: item.subRows?.map((subRow) =>
				enrichRow(
					subRow,
					group.eventId,
					subRow.optionIndex ?? 0,
					availability
				)
			)
		};
	}

	return enrichRow(item, group.eventId, 0, availability);
};

export const mergeTourReviewWithAvailability = (
	items: IOrderTourReviewItem[],
	availability: IBookingEventAvailability[],
	tourEvents?: ITourEvent[]
): IOrderTourReviewItem[] => {
	if (tourEvents?.length) {
		return items.map((item) =>
			mergeItemWithTourEvents(item, tourEvents, availability)
		);
	}

	const groups = groupAvailabilityByEventId(availability);

	return items.map((item, index) =>
		mergeItemWithAvailabilityGroup(item, groups[index], availability)
	);
};
