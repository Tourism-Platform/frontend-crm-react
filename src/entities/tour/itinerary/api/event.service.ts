import { ENUM_API_TAGS, TOUR_EVENTS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAddPoolMemberToBackend,
	mapAllEventsToFrontend,
	mapEventCreateToBackend,
	mapEventOptionCreateToBackend,
	mapEventOptionReadToWriteBody,
	mapEventOverrideToBackend,
	mapEventProductDetachToBackend,
	mapEventProductLinkToBackend,
	mapEventProductRelinkToBackend,
	mapEventProductScopeUpdateToBackend,
	mapEventReadLangQueryToBackend,
	mapEventReorderToBackend,
	mapEventUpdateToBackend,
	mapGetTourEventToFrontend,
	mapMoveToMultiResultToFrontend,
	mapMoveToMultiToBackend,
	mapMoveToSingleResultToFrontend,
	mapOptionReorderToBackend,
	mapSupplierPolicyWarningListToFrontend
} from "../converters";
import type {
	IAddEventOption,
	IAddEventPoolMember,
	IAttachOptionProduct,
	IClearOptionOverride,
	IDeleteEventOption,
	IDetachOptionProduct,
	IGetTourEventResult,
	IMoveEventOptionToSingle,
	IMoveEventToMulti,
	IMoveToMultiResult,
	IMoveToSingleResult,
	IPolicyCheckEventArgs,
	IPolicyCheckOptionArgs,
	IRelinkOptionProduct,
	IRemoveEventPoolMember,
	IReorderEventOptions,
	IScopeOptionProduct,
	ISetEventPoolMemberMain,
	ISetOptionOverride,
	ISupplierPolicyWarning,
	ITourEvent,
	ITourEventCreate,
	ITourEventReorder,
	ITourEventUpdate,
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

/**
 * Unified option-level event API (contract 3.1).
 *
 * Every option-row mutation addresses `eventId` (slot) + `eventOptionId`
 * (option row — `event.id` for single events, `details[i].id` for multi
 * alternatives). There are no single/multi-specific endpoints anymore.
 */
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
				supplyId?: string;
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
				mapGetTourEventToFrontend(
					response,
					arg.eventOptionId,
					arg.supplyId
				),
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

		/* ------------------------- unified option CRUD ------------------------ */

		addOption: builder.mutation<ITourEvent, IAddEventOption>({
			query: ({ tourId, optionId, eventId, data }) => ({
				...TOUR_EVENTS_PATHS.addOption(tourId, optionId, eventId),
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
		/** Form-driven option update (single events and multi alternatives alike). */
		updateOption: builder.mutation<ITourEvent, ITourEventUpdate>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				type,
				data,
				language,
				currentDetails
			}) => ({
				...TOUR_EVENTS_PATHS.updateOption(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				body: mapEventUpdateToBackend(
					type,
					data,
					language,
					currentDetails
				)
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
		/** Option update from a READ option row (READ → WRITE inside the service). */
		updateOptionContent: builder.mutation<
			ITourEvent,
			IUpdateEventOptionContent
		>({
			query: ({ tourId, optionId, eventId, eventOptionId, option }) => ({
				...TOUR_EVENTS_PATHS.updateOption(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				body: mapEventOptionReadToWriteBody(option)
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
		/** Unified option delete — responds 200 with the updated TourEventResponse. */
		deleteOption: builder.mutation<ITourEvent, IDeleteEventOption>({
			query: ({ tourId, optionId, eventId, eventOptionId }) => ({
				...TOUR_EVENTS_PATHS.deleteOption(
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

		/* ------------------------------ move flows ---------------------------- */

		moveEventToMulti: builder.mutation<
			IMoveToMultiResult,
			IMoveEventToMulti
		>({
			query: ({
				tourId,
				optionId,
				eventId,
				targetEventId,
				optionPosition
			}) => ({
				...TOUR_EVENTS_PATHS.moveEventToMulti(
					tourId,
					optionId,
					eventId,
					targetEventId
				),
				body: mapMoveToMultiToBackend({ optionPosition })
			}),
			transformResponse: (response: TMoveToMultiResultBackend) =>
				mapMoveToMultiResultToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		moveOptionToSingle: builder.mutation<
			IMoveToSingleResult,
			IMoveEventOptionToSingle
		>({
			query: ({ tourId, optionId, eventId, eventOptionId, target }) => ({
				...TOUR_EVENTS_PATHS.moveOptionToSingle(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				// Final slot placement travels in the same request (or null).
				body: target ? mapEventReorderToBackend(target) : null
			}),
			transformResponse: (response: TMoveToSingleResultBackend) =>
				mapMoveToSingleResultToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				eventsTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),

		/* --------------------------- product linking -------------------------- */

		attachOptionProduct: builder.mutation<ITourEvent, IAttachOptionProduct>(
			{
				query: ({
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId,
					data,
					language
				}) => ({
					...TOUR_EVENTS_PATHS.attachPoolMemberProduct(
						tourId,
						optionId,
						eventId,
						eventOptionId,
						supplyId
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
			}
		),
		detachOptionProduct: builder.mutation<ITourEvent, IDetachOptionProduct>(
			{
				query: ({
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId,
					data,
					language
				}) => ({
					...TOUR_EVENTS_PATHS.detachPoolMemberProduct(
						tourId,
						optionId,
						eventId,
						eventOptionId,
						supplyId
					),
					params: mapEventReadLangQueryToBackend(language),
					body: mapEventProductDetachToBackend(data)
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
			}
		),
		relinkOptionProduct: builder.mutation<ITourEvent, IRelinkOptionProduct>(
			{
				query: ({
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId,
					data,
					language
				}) => ({
					...TOUR_EVENTS_PATHS.relinkPoolMemberProduct(
						tourId,
						optionId,
						eventId,
						eventOptionId,
						supplyId
					),
					params: mapEventReadLangQueryToBackend(language),
					body: mapEventProductRelinkToBackend(data)
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
			}
		),
		scopeOptionProduct: builder.mutation<ITourEvent, IScopeOptionProduct>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				supplyId,
				data,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.scopePoolMemberProduct(
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId
				),
				params: mapEventReadLangQueryToBackend(language),
				body: mapEventProductScopeUpdateToBackend(data)
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

		addPoolMember: builder.mutation<ITourEvent, IAddEventPoolMember>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				intent,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.addPoolMember(
					tourId,
					optionId,
					eventId,
					eventOptionId
				),
				params: mapEventReadLangQueryToBackend(language),
				body: mapAddPoolMemberToBackend(intent)
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
		removePoolMember: builder.mutation<ITourEvent, IRemoveEventPoolMember>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				supplyId,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.removePoolMember(
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId
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
		setPoolMemberMain: builder.mutation<
			ITourEvent,
			ISetEventPoolMemberMain
		>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				supplyId,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.setPoolMemberMain(
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId
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

		/* ------------------------------ overrides ----------------------------- */

		setOptionOverride: builder.mutation<ITourEvent, ISetOptionOverride>({
			query: ({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				supplyId,
				data,
				language
			}) => ({
				...TOUR_EVENTS_PATHS.setPoolMemberOverride(
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId
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
		clearOptionOverride: builder.mutation<ITourEvent, IClearOptionOverride>(
			{
				query: ({
					tourId,
					optionId,
					eventId,
					eventOptionId,
					supplyId,
					language
				}) => ({
					...TOUR_EVENTS_PATHS.clearPoolMemberOverride(
						tourId,
						optionId,
						eventId,
						eventOptionId,
						supplyId
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
			}
		)
	})
});

export const {
	usePolicyCheckEventQuery,
	usePolicyCheckOptionQuery,
	useListTourEventsQuery,
	useGetTourEventQuery,
	useCreateEventMutation,
	useDeleteTourEventMutation,
	useReorderEventMutation,
	useAddOptionMutation,
	useUpdateOptionMutation,
	useUpdateOptionContentMutation,
	// Aliased: `useDeleteOptionMutation` collides with the tour-OPTION service.
	useDeleteOptionMutation: useDeleteTourEventOptionMutation,
	useReorderEventOptionsMutation,
	useMoveEventToMultiMutation,
	useMoveOptionToSingleMutation,
	useAttachOptionProductMutation,
	useDetachOptionProductMutation,
	useRelinkOptionProductMutation,
	useScopeOptionProductMutation,
	useAddPoolMemberMutation,
	useRemovePoolMemberMutation,
	useSetPoolMemberMainMutation,
	useSetOptionOverrideMutation,
	useClearOptionOverrideMutation
} = tourEventApi;
