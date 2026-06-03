import { useMemo } from "react";

import {
	type ITourEvent,
	useGetTourGeneralQuery,
	useListTourEventsQuery
} from "@/entities/tour";

import type { IDayItem, IOptionData } from "../types";

const DEFAULT_EVENTS: ITourEvent[] = [];

export const useItineraryEvents = (tourId: string, activeOption: string) => {
	const { data: tour } = useGetTourGeneralQuery(tourId, {
		skip: !tourId
	});

	const { data: backendEvents = DEFAULT_EVENTS } = useListTourEventsQuery(
		{ tourId, optionId: activeOption },
		{ skip: !tourId || !activeOption }
	);

	const tourDuration = useMemo(() => {
		if (!tour?.duration) return 1;
		if (typeof tour.duration === "object") {
			return Math.max(tour.duration.from ?? 1, tour.duration.to ?? 1);
		}
		return Number(tour.duration) || 1;
	}, [tour?.duration]);

	const daysCount = useMemo(() => {
		const maxEventDay = backendEvents.reduce(
			(max, ev) => (ev.day > 0 ? Math.max(max, ev.day) : max),
			0
		);
		return Math.max(tourDuration, maxEventDay, 1);
	}, [tourDuration, backendEvents]);

	const EMPTY_OPTION_DATA = useMemo((): IOptionData => {
		const days: Record<number, IDayItem[]> = {};
		const dayOrder: number[] = [];
		for (let i = 1; i <= daysCount; i++) {
			dayOrder.push(i);
			days[i] = [];
		}
		return {
			tripDetails: [],
			days,
			dayOrder
		};
	}, [daysCount]);

	const eventsAsOptionData = useMemo((): IOptionData => {
		if (backendEvents.length === 0) {
			return EMPTY_OPTION_DATA;
		}

		const days: Record<number, IDayItem[]> = {};
		const dayOrder: number[] = [];
		const tripDetails: IDayItem[] = [];

		for (let i = 1; i <= daysCount; i++) {
			dayOrder.push(i);
			days[i] = [];
		}

		for (const ev of backendEvents) {
			const item: IDayItem = {
				id: ev.id,
				block_id: ev.id,
				eventType: ev.eventType,
				title: ev.name,
				subtitle: ev.description || "Information",
				backendId: ev.id
			};

			if (ev.day === 0) {
				tripDetails.push(item);
			} else {
				days[ev.day]?.push(item);
			}
		}

		// Сортировка tripDetails по position
		tripDetails.sort((a, b) => {
			const posA =
				backendEvents.find((e) => e.id === a.backendId)?.position ?? 0;
			const posB =
				backendEvents.find((e) => e.id === b.backendId)?.position ?? 0;
			return posA - posB;
		});

		// Сортировка по position внутри каждого дня
		for (const day of dayOrder) {
			days[day].sort((a, b) => {
				const posA =
					backendEvents.find((e) => e.id === a.backendId)?.position ??
					0;
				const posB =
					backendEvents.find((e) => e.id === b.backendId)?.position ??
					0;
				return posA - posB;
			});
		}

		return { tripDetails, days, dayOrder };
	}, [backendEvents, daysCount, EMPTY_OPTION_DATA]);

	return { eventsAsOptionData, EMPTY_OPTION_DATA };
};
