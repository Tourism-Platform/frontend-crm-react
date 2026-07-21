import { ENUM_API_TAGS, TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";
import type { TTourEvent } from "@/entities/tour/itinerary";

import {
	mapEventLibraryCreateToBackend,
	mapEventLibraryFiltersToBackend,
	mapEventLibraryItemToFrontend,
	mapEventLibraryListToFrontend,
	mapEventLibraryToForm,
	mapEventLibraryUpdateToBackend
} from "../converters";
import type {
	IEventLibraryCreate,
	IEventLibraryFilters,
	IEventLibraryItem,
	IEventLibraryUpdate,
	TEventLibraryItemBackend,
	TEventLibraryListBackendResponse
} from "../types";

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
			transformResponse: (
				response: TEventLibraryListBackendResponse,
				_meta,
				arg
			) => mapEventLibraryListToFrontend(response, arg),
			providesTags: [ENUM_API_TAGS.EVENT_LIBRARY]
		}),
		getEventLibrary: builder.query<IEventLibraryItem, string>({
			query: (libraryId) => ({
				...TOUR_EVENT_LIBRARY_PATHS.getLibraryEvent(libraryId)
			}),
			transformResponse: (response: TEventLibraryItemBackend) =>
				mapEventLibraryItemToFrontend(response),
			providesTags: (_result, _error, libraryId) => [
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		getEventLibraryRaw: builder.query<TTourEvent, string>({
			query: (libraryId) => ({
				...TOUR_EVENT_LIBRARY_PATHS.getLibraryEvent(libraryId)
			}),
			transformResponse: (response: TEventLibraryItemBackend) =>
				mapEventLibraryToForm(response),
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
		updateEventLibrary: builder.mutation<
			IEventLibraryItem,
			IEventLibraryUpdate
		>({
			query: ({ libraryId, type, data, language }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent(libraryId),
				body: mapEventLibraryUpdateToBackend(type, data, language)
			}),
			transformResponse: (response: TEventLibraryItemBackend) =>
				mapEventLibraryItemToFrontend(response),
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
	useGetEventLibraryQuery,
	useGetEventLibraryRawQuery,
	useCreateEventLibraryMutation,
	useUpdateEventLibraryMutation,
	useDeleteEventLibraryMutation
} = eventLibraryApi;
