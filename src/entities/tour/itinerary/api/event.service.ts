import { ENUM_API_TAGS, TOUR_EVENTS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAllEventsToFrontend,
	mapEventCreateToBackend,
	mapEventReorderToBackend,
	mapEventToFrontend,
	mapEventUpdateToBackend
} from "../converters";
import type {
	ITourEvent,
	ITourEventCreate,
	ITourEventReorder,
	ITourEventUpdate,
	TTourEvent,
	TTourEventBackendResponce
} from "../types";

export const tourEventApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listTourEvents: builder.query<
			ITourEvent[],
			{ tourId: string; optionId: string; day?: number | null }
		>({
			query: ({ tourId, optionId, day }) => ({
				...TOUR_EVENTS_PATHS.listTourEvents(tourId, optionId),
				params: day !== undefined ? { day } : undefined
			}),
			transformResponse: (response: TTourEventBackendResponce[]) =>
				response.map(mapAllEventsToFrontend),
			providesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_EVENTS,
					id: `${tourId}-${optionId}`
				}
			]
		}),
		getTourEvent: builder.query<
			TTourEvent,
			{ tourId: string; optionId: string; eventId: string }
		>({
			query: ({ tourId, optionId, eventId }) => ({
				...TOUR_EVENTS_PATHS.getTourEvent(tourId, optionId, eventId)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapEventToFrontend(response)
		}),
		createEvent: builder.mutation<
			ITourEvent,
			{ tourId: string; optionId: string; data: ITourEventCreate }
		>({
			query: ({ tourId, optionId, data }) => ({
				...TOUR_EVENTS_PATHS.createEvent(tourId, optionId),
				body: mapEventCreateToBackend(data)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			async onQueryStarted(
				{ tourId, optionId },
				{ dispatch, queryFulfilled }
			) {
				try {
					const { data: newEvent } = await queryFulfilled;
					dispatch(
						tourEventApi.util.updateQueryData(
							"listTourEvents",
							{ tourId, optionId },
							(draft) => {
								draft.push(newEvent);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			},
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
					id: `${tourId}:${optionId}`
				}
			]
		}),
		updateTourEvent: builder.mutation<ITourEvent, ITourEventUpdate>({
			query: ({ tourId, optionId, eventId, type, data }) => ({
				...TOUR_EVENTS_PATHS.updateTourEvent(tourId, optionId, eventId),
				body: mapEventUpdateToBackend(type, data)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			// async onQueryStarted(
			// 	{ tourId, optionId, eventId },
			// 	{ dispatch, queryFulfilled }
			// ) {
			// 	try {
			// 		const { data: updatedEvent } = await queryFulfilled;
			// 		dispatch(
			// 			tourEventApi.util.updateQueryData(
			// 				"listTourEvents",
			// 				{ tourId, optionId },
			// 				(draft) => {
			// 					const index = draft.findIndex(
			// 						(e) => e.id === eventId
			// 					);
			// 					if (index !== -1) {
			// 						draft[index] = updatedEvent;
			// 					}
			// 				}
			// 			)
			// 		);
			// 	} catch (error) {
			// 		console.error(error);
			// 	}
			// }
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_EVENTS,
					id: `${tourId}-${optionId}`
				},
				{
					type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
					id: `${tourId}:${optionId}`
				}
			]
		}),
		deleteTourEvent: builder.mutation<
			void,
			{ tourId: string; optionId: string; eventId: string }
		>({
			query: ({ tourId, optionId, eventId }) => ({
				...TOUR_EVENTS_PATHS.deleteTourEvent(tourId, optionId, eventId)
			}),
			async onQueryStarted(
				{ tourId, optionId, eventId },
				{ dispatch, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					dispatch(
						tourEventApi.util.updateQueryData(
							"listTourEvents",
							{ tourId, optionId },
							(draft) => {
								return draft.filter((e) => e.id !== eventId);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			},
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
					id: `${tourId}:${optionId}`
				}
			]
		}),
		reorderEvent: builder.mutation<
			ITourEvent,
			{
				tourId: string;
				optionId: string;
				eventId: string;
				data: ITourEventReorder;
			}
		>({
			query: ({ tourId, optionId, eventId, data }) => ({
				...TOUR_EVENTS_PATHS.reorderEvent(tourId, optionId, eventId),
				body: mapEventReorderToBackend(data)
			}),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
					id: `${tourId}:${optionId}`
				}
			]
		})
	})
});

export const {
	useListTourEventsQuery,
	useGetTourEventQuery,
	useCreateEventMutation,
	useUpdateTourEventMutation,
	useDeleteTourEventMutation,
	useReorderEventMutation
} = tourEventApi;
