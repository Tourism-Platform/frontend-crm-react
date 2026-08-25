import { ENUM_API_TAGS, TOUR_EVENTS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAllEventsToFrontend,
	mapEventCreateToBackend,
	mapEventOptionCreateToBackend,
	mapEventOverrideToBackend,
	mapEventProductLinkToBackend,
	mapEventReadLangQueryToBackend,
	mapEventReorderToBackend,
	mapEventUpdateToBackend,
	mapGetTourEventToFrontend,
	mapMoveToMultiResultToFrontend,
	mapMoveToSingleResultToFrontend,
	mapOptionReorderToBackend,
	mapSupplierPolicyWarningListToFrontend
} from "../converters";
import type {
	IAddEventOption,
	IAttachEventOptionProduct,
	IAttachSingleEventProduct,
	IClearEventOptionOverride,
	IClearSingleEventOverride,
	IDeleteEventOption,
	IDetachEventOptionProduct,
	IDetachSingleEventProduct,
	IGetTourEventResult,
	IMoveEventOptionToSingle,
	IMoveEventToMulti,
	IMoveToMultiResult,
	IMoveToSingleResult,
	IPolicyCheckEventArgs,
	IPolicyCheckOptionArgs,
	IReorderEventOptions,
	ISetEventOptionOverride,
	ISetSingleEventOverride,
	ISupplierPolicyWarning,
	ITourEvent,
	ITourEventCreate,
	ITourEventReorder,
	ITourEventUpdate,
	IUpdateEventOption,
	IUpdateEventOptionContent,
	TMoveToMultiResultBackend,
	TMoveToSingleResultBackend,
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

const policyEventTag = (tourId: string, optionId: string, eventId: string) => ({
	type: ENUM_API_TAGS.TOUR_POLICY_CHECK,
	id: `${tourId}-${optionId}-${eventId}`
});

const policyOptionTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOUR_POLICY_CHECK,
	id: `${tourId}-${optionId}`
});

const policyInvalidation = (
	tourId: string,
	optionId: string,
	eventId: string
) => [
	policyEventTag(tourId, optionId, eventId),
	policyOptionTag(tourId, optionId)
];

export const tourEventApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		policyCheckEvent: builder.query<
			ISupplierPolicyWarning[],
			IPolicyCheckEventArgs
		>({
			query: ({ tourId, optionId, eventId }) => ({
				...TOUR_EVENTS_PATHS.policyCheckEvent(tourId, optionId, eventId)
			}),
			transformResponse: mapSupplierPolicyWarningListToFrontend,
			providesTags: (_r, _e, { tourId, optionId, eventId }) => [
				policyEventTag(tourId, optionId, eventId),
				policyOptionTag(tourId, optionId)
			]
		}),
		policyCheckOption: builder.query<
			ISupplierPolicyWarning[],
			IPolicyCheckOptionArgs
		>({
			query: ({ tourId, optionId }) => ({
				...TOUR_EVENTS_PATHS.policyCheckOption(tourId, optionId)
			}),
			transformResponse: mapSupplierPolicyWarningListToFrontend,
			providesTags: (_r, _e, { tourId, optionId }) => [
				policyOptionTag(tourId, optionId)
			]
		}),
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
			IGetTourEventResult,
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
			) => mapGetTourEventToFrontend(response, arg.eventOptionId),
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
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
		}),
		attachSingleEventProduct: builder.mutation<
			ITourEvent,
			IAttachSingleEventProduct
		>({
			query: ({ tourId, optionId, eventId, data, language }) => ({
				...TOUR_EVENTS_PATHS.attachSingleEventProduct(
					tourId,
					optionId,
					eventId
				),
				params: mapEventReadLangQueryToBackend(language),
				body: mapEventProductLinkToBackend(data)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		detachSingleEventProduct: builder.mutation<
			ITourEvent,
			IDetachSingleEventProduct
		>({
			query: ({ tourId, optionId, eventId, language }) => ({
				...TOUR_EVENTS_PATHS.detachSingleEventProduct(
					tourId,
					optionId,
					eventId
				),
				params: mapEventReadLangQueryToBackend(language)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		attachEventOptionProduct: builder.mutation<
			ITourEvent,
			IAttachEventOptionProduct
		>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				data,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.attachEventOptionProduct(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				params: mapEventReadLangQueryToBackend(language),
				body: mapEventProductLinkToBackend(data)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		detachEventOptionProduct: builder.mutation<
			ITourEvent,
			IDetachEventOptionProduct
		>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.detachEventOptionProduct(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				params: mapEventReadLangQueryToBackend(language)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		setSingleEventOverride: builder.mutation<
			ITourEvent,
			ISetSingleEventOverride
		>({
			query: ({ tourId, optionId, eventId, data, language }) => ({
				...TOUR_EVENTS_PATHS.setSingleEventOverride(
					tourId,
					optionId,
					eventId
				),
				params: mapEventReadLangQueryToBackend(language),
				body: mapEventOverrideToBackend(data)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		clearSingleEventOverride: builder.mutation<
			ITourEvent,
			IClearSingleEventOverride
		>({
			query: ({ tourId, optionId, eventId, language }) => ({
				...TOUR_EVENTS_PATHS.clearSingleEventOverride(
					tourId,
					optionId,
					eventId
				),
				params: mapEventReadLangQueryToBackend(language)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		setEventOptionOverride: builder.mutation<
			ITourEvent,
			ISetEventOptionOverride
		>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				data,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.setEventOptionOverride(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				params: mapEventReadLangQueryToBackend(language),
				body: mapEventOverrideToBackend(data)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		}),
		clearEventOptionOverride: builder.mutation<
			ITourEvent,
			IClearEventOptionOverride
		>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.clearEventOptionOverride(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				params: mapEventReadLangQueryToBackend(language)
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
				pricingTag(tourId, optionId),
				...policyInvalidation(tourId, optionId, eventId)
			]
		})
	})
});

export const {
	usePolicyCheckEventQuery,
	usePolicyCheckOptionQuery,
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
	useMoveEventOptionToSingleMutation,
	useAttachSingleEventProductMutation,
	useDetachSingleEventProductMutation,
	useAttachEventOptionProductMutation,
	useDetachEventOptionProductMutation,
	useSetSingleEventOverrideMutation,
	useClearSingleEventOverrideMutation,
	useSetEventOptionOverrideMutation,
	useClearEventOptionOverrideMutation
} = tourEventApi;
