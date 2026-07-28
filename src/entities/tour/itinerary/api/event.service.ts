import { ENUM_API_TAGS, TOUR_EVENTS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAllEventsToFrontend,
	mapEventCreateToBackend,
	mapEventOptionCreateToBackend,
	mapEventOptionToFrontend,
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
	IUpdateEventOptionContent,
	TMoveToMultiResultBackend,
	TMoveToSingleResultBackend,
	TTourEvent,
	TTourEventBackendResponce
} from "../types";

const eventsTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_EVENTS,
	id: `${tourId}-${optionId}`
});

const eventDetailTag = (
	tourId: string,
	optionId: string,
	eventId: string,
	eventOptionId?: string
) => ({
	type: ENUM_API_TAGS.TOURS_EVENTS,
	id: `${tourId}-${optionId}-${eventId}-${eventOptionId || ""}`
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
			{
				tourId: string;
				optionId: string;
				eventId: string;
				eventOptionId?: string;
			}
		>({
			query: ({ tourId, optionId, eventId }) => ({
				...TOUR_EVENTS_PATHS.getTourEvent(tourId, optionId, eventId)
			}),
			transformResponse: (
				response: TTourEventBackendResponce,
				_meta,
				arg
			) =>
				arg.eventOptionId
					? mapEventOptionToFrontend(response, arg.eventOptionId)
					: mapEventToFrontend(response),
			providesTags: (
				_result,
				_error,
				{ tourId, optionId, eventId, eventOptionId }
			) => [eventDetailTag(tourId, optionId, eventId, eventOptionId)]
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
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
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
			invalidatesTags: (
				_result,
				_error,
				{ tourId, optionId, eventId }
			) => [
				eventsTag(tourId, optionId),
				eventDetailTag(tourId, optionId, eventId),
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
			invalidatesTags: (
				_result,
				_error,
				{ tourId, optionId, eventId }
			) => [
				eventsTag(tourId, optionId),
				eventDetailTag(tourId, optionId, eventId),
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
			invalidatesTags: (
				_result,
				_error,
				{ tourId, optionId, eventId }
			) => [
				eventsTag(tourId, optionId),
				eventDetailTag(tourId, optionId, eventId),
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
				body: mapEventUpdateToBackend(type, data, language)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (
				_result,
				_error,
				{ tourId, optionId, eventId, eventOptionId }
			) => [
				eventsTag(tourId, optionId),
				eventDetailTag(tourId, optionId, eventId),
				eventDetailTag(tourId, optionId, eventId, eventOptionId),
				pricingTag(tourId, optionId)
			]
		}),
		updateEventOptionContent: builder.mutation<
			ITourEvent,
			IUpdateEventOptionContent
		>({
			query: ({ tourId, optionId, eventId, eventOptionId, data }) => ({
				...TOUR_EVENTS_PATHS.updateEventOption(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				body: mapEventOptionCreateToBackend(data)
			}),
			transformResponse: (response: TTourEventBackendResponce) =>
				mapAllEventsToFrontend(response),
			invalidatesTags: (
				_result,
				_error,
				{ tourId, optionId, eventId, eventOptionId }
			) => [
				eventsTag(tourId, optionId),
				eventDetailTag(tourId, optionId, eventId),
				eventDetailTag(tourId, optionId, eventId, eventOptionId),
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
				invalidatesTags: (
					_result,
					_error,
					{ tourId, optionId, eventId }
				) => [
					eventsTag(tourId, optionId),
					eventDetailTag(tourId, optionId, eventId)
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
	useUpdateEventOptionContentMutation,
	useDeleteEventOptionMutation,
	useReorderEventOptionsMutation,
	useMoveEventToMultiMutation,
	useMoveEventOptionToSingleMutation
} = tourEventApi;
