import { useMemo } from "react";

import {
	ENUM_EVENT,
	type ITourEvent,
	useGetTourGeneralQuery,
	useListTourEventsQuery
} from "@/entities/tour";

export interface IEventNavDay {
	day: number;
	events: ITourEvent[];
}

const DEFAULT_EVENTS: ITourEvent[] = [];

/** Days of the active option with their events sorted by position (same rules as the itinerary board). */
export const useEventNavDays = (tourId: string, optionId: string) => {
	const { data: tour } = useGetTourGeneralQuery(tourId, { skip: !tourId });

	const { data: events = DEFAULT_EVENTS, isLoading } = useListTourEventsQuery(
		{ tourId, optionId },
		{ skip: !tourId || !optionId }
	);

	const days = useMemo((): IEventNavDay[] => {
		const duration = tour?.duration;
		const tourDuration = !duration
			? 1
			: typeof duration === "object"
				? Math.max(duration.from ?? 1, duration.to ?? 1)
				: Number(duration) || 1;

		const maxEventDay = events.reduce(
			(max, ev) => (ev.day > 0 ? Math.max(max, ev.day) : max),
			0
		);
		const daysCount = Math.max(tourDuration, maxEventDay, 1);

		const result: IEventNavDay[] = Array.from(
			{ length: daysCount },
			(_, i) => ({ day: i + 1, events: [] })
		);

		for (const ev of events) {
			if (ev.day > 0) result[ev.day - 1].events.push(ev);
		}
		for (const day of result) {
			day.events.sort((a, b) => a.position - b.position);
		}

		return result;
	}, [events, tour?.duration]);

	return { days, isLoading };
};

export const isMultiplyOptionEvent = (ev: ITourEvent) =>
	ev.eventType === ENUM_EVENT.MULTIPLY_OPTION;
