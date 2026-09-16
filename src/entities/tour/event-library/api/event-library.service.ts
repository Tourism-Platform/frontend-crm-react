import { ENUM_API_TAGS, TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";
import type { TTourEvent } from "@/entities/tour/itinerary";
import {
	type TAddPoolMemberIntent,
	mapAddPoolMemberToBackend
} from "@/entities/tour/itinerary";

import {
	mapEventLibraryCreateToBackend,
	mapEventLibraryFiltersToBackend,
	mapEventLibraryItemToFrontend,
	mapEventLibraryListToFrontend,
	mapEventLibraryToForm,
	mapEventLibraryUpdateToBackend,
	mapLibraryPoolAddToBackend,
	mapLibraryPoolRemoveToBackend
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
		getEventLibraryRaw: builder.query<
			TTourEvent,
			{ libraryId: string; supplyId?: string }
		>({
			query: ({ libraryId }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.getLibraryEvent(libraryId)
			}),
			transformResponse: (
				response: TEventLibraryItemBackend,
				_meta,
				arg
			) => mapEventLibraryToForm(response, arg.supplyId),
			providesTags: (_result, _error, { libraryId }) => [
				{ type: ENUM_API_TAGS.EVENT_LIBRARY, id: libraryId }
			]
		}),
		/** Full library item for create-from-template (backend shape, not form). */
		getEventLibraryTemplate: builder.query<
			TEventLibraryItemBackend,
			string
		>({
			query: (libraryId) => ({
				...TOUR_EVENT_LIBRARY_PATHS.getLibraryEvent(libraryId)
			}),
			transformResponse: (response: TEventLibraryItemBackend) => response,
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
			query: ({ libraryId, type, data, language, currentDetails }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent(libraryId),
				body: mapEventLibraryUpdateToBackend(
					type,
					data,
					language,
					currentDetails
				)
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
			| {
					libraryId: string;
					action: "add";
					template: TEventLibraryItemBackend;
					intent: TAddPoolMemberIntent;
			  }
			| {
					libraryId: string;
					action: "remove";
					template: TEventLibraryItemBackend;
					supplyId: string;
			  }
		>({
			query: (arg) => ({
				...TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent(arg.libraryId),
				body:
					arg.action === "add"
						? mapLibraryPoolAddToBackend(
								arg.template,
								mapAddPoolMemberToBackend(arg.intent)
							)
						: mapLibraryPoolRemoveToBackend(
								arg.template,
								arg.supplyId
							)
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
	useGetEventLibraryTemplateQuery,
	useLazyGetEventLibraryTemplateQuery,
	useCreateEventLibraryMutation,
	useUpdateEventLibraryMutation,
	usePatchEventLibraryPoolMutation,
	useDeleteEventLibraryMutation
} = eventLibraryApi;
