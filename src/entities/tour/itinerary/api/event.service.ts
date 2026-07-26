import { ENUM_API_TAGS, TOUR_EVENTS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAllEventsToFrontend,
	mapEventCreateToBackend,
	mapEventOptionCreateToBackend,
	mapEventOptionUpdateToBackend,
	mapEventReorderToBackend,
	mapEventToFrontend,
	mapEventUpdateToBackend,
	mapMoveToMultiResultToFrontend,
	mapMoveToSingleResultToFrontend,
	mapOptionReorderToBackend
} from "../converters";
import type {
	IAddEventOption,
	IDeleteEventOption,
	IMoveEventOptionToSingle,
	IMoveEventToMulti,
	IMoveToMultiResult,
	IMoveToSingleResult,
	IReorderEventOptions,
	ITourEvent,
	ITourEventCreate,
	ITourEventReorder,
	ITourEventUpdate,
	IUpdateEventOption,
	TMoveToMultiResultBackend,
	TMoveToSingleResultBackend,
	TTourEvent,
	TTourEventBackendResponce
} from "../types";

const eventsTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_EVENTS,
	id: `${tourId}-${optionId}`
});

const pricingTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
	id: `${tourId}:${optionId}`
});

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
				eventsTag(tourId, optionId)
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
				pricingTag(tourId, optionId)
			]
		}),
		updateTourEvent: builder.mutation<ITourEvent, ITourEventUpdate>({
			query: ({ tourId, optionId, eventId, type, data, language }) => ({
				...TOUR_EVENTS_PATHS.updateSingleEvent(
					tourId,
					optionId,
					eventId
				),
				body: mapEventUpdateToBackend(type, data, language)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
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
				pricingTag(tourId, optionId)
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
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		addEventOption: builder.mutation<ITourEvent, IAddEventOption>({
			query: ({ tourId, optionId, eventId, data }) => ({
				...TOUR_EVENTS_PATHS.addEventOption(tourId, optionId, eventId),
				body: mapEventOptionCreateToBackend(data)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		updateEventOption: builder.mutation<ITourEvent, IUpdateEventOption>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				type,
				data,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.updateEventOption(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				body: mapEventOptionUpdateToBackend(type, data, language)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		deleteEventOption: builder.mutation<ITourEvent, IDeleteEventOption>({
			query: ({ tourId, optionId, eventId, eventOptionId }) => ({
				...TOUR_EVENTS_PATHS.deleteEventOption(
					tourId,
					optionId,
					eventId,
					eventOptionId
				)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		reorderEventOptions: builder.mutation<ITourEvent, IReorderEventOptions>(
			{
				query: ({ tourId, optionId, eventId, data }) => ({
					...TOUR_EVENTS_PATHS.reorderEventOptions(
						tourId,
						optionId,
						eventId
					),
					body: mapOptionReorderToBackend(data)
				}),
				transformResponse: (response: TTourEventBackendResponce) =>
					mapAllEventsToFrontend(response),
				invalidatesTags: (_result, _error, { tourId, optionId }) => [
					eventsTag(tourId, optionId)
				]
			}
		),
		moveEventToMulti: builder.mutation<
			IMoveToMultiResult,
			IMoveEventToMulti
		>({
			query: ({ tourId, optionId, eventId, targetEventId }) => ({
				...TOUR_EVENTS_PATHS.moveEventToMulti(
					tourId,
					optionId,
					eventId,
					targetEventId
				)
			}),
			transformResponse: (response: TMoveToMultiResultBackend) =>
				mapMoveToMultiResultToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		moveEventOptionToSingle: builder.mutation<
			IMoveToSingleResult,
			IMoveEventOptionToSingle
		>({
			query: ({ tourId, optionId, eventId, eventOptionId }) => ({
				...TOUR_EVENTS_PATHS.moveEventOptionToSingle(
					tourId,
					optionId,
					eventId,
					eventOptionId
				)
			}),
			transformResponse: (response: TMoveToSingleResultBackend) =>
				mapMoveToSingleResultToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
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
	useReorderEventMutation,
	useAddEventOptionMutation,
	useUpdateEventOptionMutation,
	useDeleteEventOptionMutation,
	useReorderEventOptionsMutation,
	useMoveEventToMultiMutation,
	useMoveEventOptionToSingleMutation
} = tourEventApi;
