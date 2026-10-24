import type { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { TOUR_EVENTS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import type { TTourEventBackendResponce } from "../types";

import { eventDetailTag, eventsTag } from "./event-tags";

interface IEventSlotTarget {
	tourId: string;
	optionId: string;
	eventId: string;
}

/**
 * The slot READ as the backend returns it — internal to the entity (not in
 * the api index): updates echo the current pool from it, the page gets the
 * converted `getTourEvent`.
 */
const tourEventReadApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getTourEventRead: builder.query<
			TTourEventBackendResponce,
			IEventSlotTarget
		>({
			query: ({ tourId, optionId, eventId }) => ({
				...TOUR_EVENTS_PATHS.getTourEvent(tourId, optionId, eventId)
			}),
			providesTags: (_result, _error, { tourId, optionId, eventId }) => [
				eventsTag(tourId, optionId),
				eventDetailTag(tourId, optionId, eventId)
			]
		})
	})
});

/** Held by the edit hook: keeps the READ cached for the body builders. */
export const { useGetTourEventReadQuery } = tourEventReadApi;

/** The slot READ from the cache (fetched when missing or invalidated). */
export const readTourEvent = async (
	dispatch: BaseQueryApi["dispatch"],
	{ tourId, optionId, eventId }: IEventSlotTarget,
	forceRefetch = false
) => {
	const read = await dispatch(
		tourEventReadApi.endpoints.getTourEventRead.initiate(
			{ tourId, optionId, eventId },
			{ subscribe: false, forceRefetch }
		)
	);
	return read.error
		? { error: read.error as FetchBaseQueryError }
		: { data: read.data as TTourEventBackendResponce };
};
