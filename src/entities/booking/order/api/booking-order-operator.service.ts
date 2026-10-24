import { BOOKING_ORDER_OPERATOR_PATHS, ENUM_API_TAGS } from "@/shared/api";
import { mapOrderLangQueryToBackend } from "@/shared/converters";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorBookingOrderToFrontend,
	orderTransitionMapper
} from "../converters";
import type {
	ENUM_ORDER_STATUS_TYPE,
	IBookingOrderQueryArgs,
	IOperatorOrderDetail,
	TBookingCancelBackend,
	TOperatorBookingItineraryBackend,
	TOperatorBookingStatusResponseBackend,
	TOperatorDeclineBookingResponseBackend,
	TOperatorOrderDetailBackend
} from "../types";

export const bookingOrderOperatorApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorBookingOrder: builder.query<
			IOperatorOrderDetail,
			IBookingOrderQueryArgs
		>({
			query: ({ bookingId, language }) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingOrder(
					bookingId
				),
				params: mapOrderLangQueryToBackend(language)
			}),
			transformResponse: (response: TOperatorOrderDetailBackend) =>
				mapOperatorBookingOrderToFrontend(response),
			providesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: bookingId }
			]
		}),
		getOperatorBookingItinerary: builder.query<
			TOperatorBookingItineraryBackend,
			string
		>({
			query: (bookingId) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingItinerary(
					bookingId
				)
			}),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
			]
		}),
		updateBookingStatus: builder.mutation<
			TOperatorBookingStatusResponseBackend,
			{ id: string; status: ENUM_ORDER_STATUS_TYPE }
		>({
			query: ({ id, status }) => {
				const transition = orderTransitionMapper.to(status);

				if (!transition) {
					throw new Error(
						`Unsupported booking status transition: ${status}`
					);
				}

				return {
					...BOOKING_ORDER_OPERATOR_PATHS.transitionBookingStatus(
						id,
						transition
					)
				};
			},
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id },
				ENUM_API_TAGS.BOOKING_ORDERS
			]
		}),
		declineBooking: builder.mutation<
			TOperatorDeclineBookingResponseBackend,
			{ id: string; data: TBookingCancelBackend }
		>({
			query: ({ id, data }) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.declineBooking(id),
				body: data
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id },
				ENUM_API_TAGS.BOOKING_ORDERS
			]
		})
	})
});

export const {
	useGetOperatorBookingOrderQuery,
	useGetOperatorBookingItineraryQuery,
	useUpdateBookingStatusMutation,
	useDeclineBookingMutation
} = bookingOrderOperatorApi;
