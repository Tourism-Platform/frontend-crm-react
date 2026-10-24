import type { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { ENUM_API_TAGS, TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import type { TEventLibraryItemBackend } from "../types";

/**
 * The library entry READ as the backend returns it — internal to the entity
 * (not in the api index): updates echo the current pool from it, pages get
 * converted models.
 */
const eventLibraryReadApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getEventLibraryRead: builder.query<TEventLibraryItemBackend, string>({
			query: (libraryId) => ({
				...TOUR_EVENT_LIBRARY_PATHS.getLibraryEvent(libraryId)
			}),
			providesTags: (_result, _error, libraryId) => [
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		})
	})
});

/** Held by the autosave part: keeps the READ cached for the body builder. */
export const { useGetEventLibraryReadQuery } = eventLibraryReadApi;

/** The entry READ from the cache (fetched when missing or invalidated). */
export const readEventLibrary = async (
	dispatch: BaseQueryApi["dispatch"],
	libraryId: string,
	forceRefetch = false
) => {
	const read = await dispatch(
		eventLibraryReadApi.endpoints.getEventLibraryRead.initiate(libraryId, {
			subscribe: false,
			forceRefetch
		})
	);
	return read.error
		? { error: read.error as FetchBaseQueryError }
		: { data: read.data as TEventLibraryItemBackend };
};
