import type {
	BaseQueryApi,
	FetchArgs,
	FetchBaseQueryError
} from "@reduxjs/toolkit/query";

import { ENUM_API_TAGS, TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";
import type { TTourEvent } from "@/entities/tour/itinerary";
import { mapAddPoolMemberToBackend } from "@/entities/tour/itinerary";

import {
	mapEventLibraryCopyQueryToBackend,
	mapEventLibraryCopyToBackend,
	mapEventLibraryCreateToBackend,
	mapEventLibraryFiltersToBackend,
	mapEventLibraryItemToFrontend,
	mapEventLibraryListToFrontend,
	mapEventLibraryTemplateToFrontend,
	mapEventLibraryToForm,
	mapEventLibraryUpdateToBackend,
	mapLibraryPoolAddToBackend,
	mapLibraryPoolRemoveToBackend
} from "../converters";
import { getEventLibraryFilterKey } from "../lib";
import type {
	IEventLibraryCopy,
	IEventLibraryCreate,
	IEventLibraryFilters,
	IEventLibraryInfiniteResponse,
	IEventLibraryItem,
	IEventLibraryTemplate,
	IEventLibraryUpdate,
	TEventLibraryItemBackend,
	TEventLibraryListBackendResponse,
	TEventLibraryPoolPatch,
	TUpdateEventLibraryBackend
} from "../types";

import { readEventLibrary } from "./event-library-read.service";

/** PATCH of the whole entry built from its current READ. */
const patchEventLibrary = async (
	{ dispatch }: BaseQueryApi,
	baseQuery: (arg: FetchArgs) => unknown,
	libraryId: string,
	toBody: (current: TEventLibraryItemBackend) => TUpdateEventLibraryBackend
) => {
	const read = await readEventLibrary(dispatch, libraryId);
	if (read.error) return { error: read.error };

	const result = (await baseQuery({
		...TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent(libraryId),
		body: toBody(read.data)
	})) as { data?: unknown; error?: FetchBaseQueryError };
	if (result.error) return { error: result.error };

	return {
		data: mapEventLibraryItemToFrontend(
			result.data as TEventLibraryItemBackend
		)
	};
};

export const eventLibraryApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listEventLibrary: builder.query<
			IPaginationResponse<IEventLibraryItem>,
			IEventLibraryFilters
		>({
			query: (filters) => ({
				...TOUR_EVENT_LIBRARY_PATHS.listLibraryEvents,
				params: mapEventLibraryFiltersToBackend(filters)
			}),
			transformResponse: (response: TEventLibraryListBackendResponse) =>
				mapEventLibraryListToFrontend(response),
			providesTags: [ENUM_API_TAGS.EVENT_LIBRARY]
		}),
		/**
		 * Infinite list: one cache entry per status + search, pages merged into
		 * it — page 1 replaces the entry, next pages append.
		 */
		listEventLibraryInfinite: builder.query<
			IEventLibraryInfiniteResponse,
			IEventLibraryFilters
		>({
			query: (filters) => ({
				...TOUR_EVENT_LIBRARY_PATHS.listLibraryEvents,
				params: mapEventLibraryFiltersToBackend(filters)
			}),
			transformResponse: (
				response: TEventLibraryListBackendResponse,
				_meta,
				arg
			) => ({
				...mapEventLibraryListToFrontend(response),
				page: arg.page,
				filterKey: getEventLibraryFilterKey(arg)
			}),
			serializeQueryArgs: ({ endpointName, queryArgs }) =>
				`${endpointName}/${getEventLibraryFilterKey(queryArgs)}`,
			merge: (currentCache, newItems, { arg }) => {
				if (arg.page === 1) {
					return newItems;
				}

				const existingIds = new Set(
					currentCache.data.map((item) => item.id)
				);
				return {
					...newItems,
					data: [
						...currentCache.data,
						...newItems.data.filter(
							(item) => !existingIds.has(item.id)
						)
					]
				};
			},
			forceRefetch: ({ currentArg, previousArg }) =>
				currentArg?.page !== previousArg?.page ||
				currentArg?.limit !== previousArg?.limit,
			providesTags: [ENUM_API_TAGS.EVENT_LIBRARY]
		}),
		// The entry views below share one READ: requests of one render dedupe.
		getEventLibrary: builder.query<IEventLibraryItem, string>({
			async queryFn(libraryId, { dispatch }) {
				const read = await readEventLibrary(dispatch, libraryId, true);
				if (read.error) return { error: read.error };

				return { data: mapEventLibraryItemToFrontend(read.data) };
			},
			providesTags: (_result, _error, libraryId) => [
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		getEventLibraryRaw: builder.query<
			TTourEvent,
			{ libraryId: string; supplyId?: string }
		>({
			async queryFn({ libraryId, supplyId }, { dispatch }) {
				const read = await readEventLibrary(dispatch, libraryId, true);
				if (read.error) return { error: read.error };

				return { data: mapEventLibraryToForm(read.data, supplyId) };
			},
			providesTags: (_result, _error, { libraryId }) => [
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		/** Library entry pool and the tour event made from it. */
		getEventLibraryTemplate: builder.query<IEventLibraryTemplate, string>({
			async queryFn(libraryId, { dispatch }) {
				const read = await readEventLibrary(dispatch, libraryId, true);
				if (read.error) return { error: read.error };

				return { data: mapEventLibraryTemplateToFrontend(read.data) };
			},
			providesTags: (_result, _error, libraryId) => [
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		createEventLibrary: builder.mutation<
			IEventLibraryItem,
			IEventLibraryCreate
		>({
			query: ({ type, data, language }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.createLibraryEvent,
				body: mapEventLibraryCreateToBackend(type, data, language)
			}),
			transformResponse: (response: TEventLibraryItemBackend) =>
				mapEventLibraryItemToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.EVENT_LIBRARY]
		}),
		copyEventLibrary: builder.mutation<
			IEventLibraryItem,
			IEventLibraryCopy
		>({
			query: ({ source, language }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.copyLibraryEvent,
				params: mapEventLibraryCopyQueryToBackend(language),
				body: mapEventLibraryCopyToBackend(source)
			}),
			transformResponse: (response: TEventLibraryItemBackend) =>
				mapEventLibraryItemToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.EVENT_LIBRARY]
		}),
		updateEventLibrary: builder.mutation<
			IEventLibraryItem,
			IEventLibraryUpdate
		>({
			// The library PATCH writes the whole entry: the current pool is echoed.
			queryFn: (
				{ libraryId, type, data, language },
				api,
				_extra,
				baseQuery
			) =>
				patchEventLibrary(api, baseQuery, libraryId, (current) =>
					mapEventLibraryUpdateToBackend(
						type,
						data,
						language,
						current.event.details
					)
				),
			invalidatesTags: (_result, _error, { libraryId }) => [
				ENUM_API_TAGS.EVENT_LIBRARY,
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		/** Autosave: PATCH with a body already built (de-duplicated by the caller). */
		updateEventLibraryBody: builder.mutation<
			IEventLibraryItem,
			{ libraryId: string; body: TUpdateEventLibraryBackend }
		>({
			query: ({ libraryId, body }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent(libraryId),
				body
			}),
			transformResponse: (response: TEventLibraryItemBackend) =>
				mapEventLibraryItemToFrontend(response),
			invalidatesTags: (_result, _error, { libraryId }) => [
				ENUM_API_TAGS.EVENT_LIBRARY,
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		patchEventLibraryPool: builder.mutation<
			IEventLibraryItem,
			TEventLibraryPoolPatch
		>({
			queryFn: (arg, api, _extra, baseQuery) =>
				patchEventLibrary(api, baseQuery, arg.libraryId, (current) =>
					arg.action === "add"
						? mapLibraryPoolAddToBackend(
								current,
								mapAddPoolMemberToBackend(arg.intent)
							)
						: mapLibraryPoolRemoveToBackend(current, arg.supplyId)
				),
			invalidatesTags: (_result, _error, { libraryId }) => [
				ENUM_API_TAGS.EVENT_LIBRARY,
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		deleteEventLibrary: builder.mutation<void, string>({
			query: (libraryId) => ({
				...TOUR_EVENT_LIBRARY_PATHS.deleteLibraryEvent(libraryId)
			}),
			invalidatesTags: [ENUM_API_TAGS.EVENT_LIBRARY]
		})
	})
});

export const {
	useListEventLibraryQuery,
	useListEventLibraryInfiniteQuery,
	useGetEventLibraryQuery,
	useGetEventLibraryRawQuery,
	useGetEventLibraryTemplateQuery,
	useLazyGetEventLibraryTemplateQuery,
	useCreateEventLibraryMutation,
	useCopyEventLibraryMutation,
	useUpdateEventLibraryMutation,
	useUpdateEventLibraryBodyMutation,
	usePatchEventLibraryPoolMutation,
	useDeleteEventLibraryMutation
} = eventLibraryApi;
