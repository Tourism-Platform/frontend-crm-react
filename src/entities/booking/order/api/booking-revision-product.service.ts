import { ENUM_API_TAGS } from "@/shared/api";
import { BOOKING_REVISION_PATHS } from "@/shared/api/generated/paths/booking-revision.paths";

import { authApi } from "@/entities/auth/api/auth.api";
import { mapEventOverrideToBackend } from "@/entities/tour";

import {
	mapRevisionEventProductLinkToBackend,
	mapRevisionEventProductQueryToBackend
} from "../converters/revision-event-product.converters";
import type {
	IAddRevisionPoolMember,
	IClearRevisionEventOverride,
	IClearRevisionEventProduct,
	IRemoveRevisionPoolMember,
	ISetRevisionEventOverride,
	ISetRevisionEventProduct,
	TRevisionPreviewBackend
} from "../types/revision-event-product.types";

const revisionTag = (bookingId: string) => ({
	type: ENUM_API_TAGS.BOOKING_REVISION,
	id: bookingId
});

const bookingOrderTag = (bookingId: string) => ({
	type: ENUM_API_TAGS.BOOKING_ORDERS,
	id: bookingId
});

const revisionInvalidation = (bookingId: string) => [
	revisionTag(bookingId),
	bookingOrderTag(bookingId)
];

export const bookingRevisionProductApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getRevisionPreview: builder.query<TRevisionPreviewBackend, string>({
			query: (bookingId) => ({
				...BOOKING_REVISION_PATHS.preview(bookingId)
			}),
			providesTags: (_result, _error, bookingId) => [
				revisionTag(bookingId)
			]
		}),
		setRevisionEventProduct: builder.mutation<
			TRevisionPreviewBackend,
			ISetRevisionEventProduct
		>({
			query: ({ bookingId, eventId, supplyId, data, optionIndex }) => ({
				...BOOKING_REVISION_PATHS.setPoolMemberProduct(
					bookingId,
					eventId,
					supplyId
				),
				params: mapRevisionEventProductQueryToBackend(optionIndex),
				body: mapRevisionEventProductLinkToBackend(data)
			}),
			invalidatesTags: (_result, _error, { bookingId }) =>
				revisionInvalidation(bookingId)
		}),
		clearRevisionEventProduct: builder.mutation<
			TRevisionPreviewBackend,
			IClearRevisionEventProduct
		>({
			query: ({ bookingId, eventId, supplyId, optionIndex }) => ({
				...BOOKING_REVISION_PATHS.clearPoolMemberProduct(
					bookingId,
					eventId,
					supplyId
				),
				params: mapRevisionEventProductQueryToBackend(optionIndex)
			}),
			invalidatesTags: (_result, _error, { bookingId }) =>
				revisionInvalidation(bookingId)
		}),
		setRevisionEventOverride: builder.mutation<
			TRevisionPreviewBackend,
			ISetRevisionEventOverride
		>({
			query: ({
				bookingId,
				eventId,
				supplyId,
				eventTyp,
				data,
				optionIndex
			}) => ({
				...BOOKING_REVISION_PATHS.setPoolMemberOverride(
					bookingId,
					eventId,
					supplyId
				),
				params: mapRevisionEventProductQueryToBackend(optionIndex),
				body: mapEventOverrideToBackend(eventTyp, data)
			}),
			invalidatesTags: (_result, _error, { bookingId }) =>
				revisionInvalidation(bookingId)
		}),
		clearRevisionEventOverride: builder.mutation<
			TRevisionPreviewBackend,
			IClearRevisionEventOverride
		>({
			query: ({ bookingId, eventId, supplyId, optionIndex }) => ({
				...BOOKING_REVISION_PATHS.clearPoolMemberOverride(
					bookingId,
					eventId,
					supplyId
				),
				params: mapRevisionEventProductQueryToBackend(optionIndex)
			}),
			invalidatesTags: (_result, _error, { bookingId }) =>
				revisionInvalidation(bookingId)
		}),
		addRevisionPoolMember: builder.mutation<
			TRevisionPreviewBackend,
			IAddRevisionPoolMember
		>({
			query: ({ bookingId, eventId, data, optionIndex }) => ({
				...BOOKING_REVISION_PATHS.addPoolMember(bookingId, eventId),
				params: mapRevisionEventProductQueryToBackend(optionIndex),
				body: data
			}),
			invalidatesTags: (_result, _error, { bookingId }) =>
				revisionInvalidation(bookingId)
		}),
		removeRevisionPoolMember: builder.mutation<
			TRevisionPreviewBackend,
			IRemoveRevisionPoolMember
		>({
			query: ({ bookingId, eventId, supplyId, optionIndex }) => ({
				...BOOKING_REVISION_PATHS.removePoolMember(
					bookingId,
					eventId,
					supplyId
				),
				params: mapRevisionEventProductQueryToBackend(optionIndex)
			}),
			invalidatesTags: (_result, _error, { bookingId }) =>
				revisionInvalidation(bookingId)
		})
	})
});

export const {
	useGetRevisionPreviewQuery,
	useSetRevisionEventProductMutation,
	useClearRevisionEventProductMutation,
	useSetRevisionEventOverrideMutation,
	useClearRevisionEventOverrideMutation,
	useAddRevisionPoolMemberMutation,
	useRemoveRevisionPoolMemberMutation
} = bookingRevisionProductApi;
