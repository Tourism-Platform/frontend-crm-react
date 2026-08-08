import { BOOKING_ORDER_OPERATOR_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorBookingOrderToFrontend,
	mapOrderStatusToTransition
} from "../converters";
import type {
	ENUM_ORDER_STATUS_TYPE,
	IOperatorOrderDetail,
	TBookingCancelBackend,
	TOperatorBookingItineraryBackend,
	TOperatorBookingStatusResponseBackend,
	TOperatorDeclineBookingResponseBackend,
	TOperatorOrderDetailBackend,
	TOperatorOrderOverviewBackend
} from "../types";

export const bookingOrderOperatorApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorBookingOrder: builder.query<IOperatorOrderDetail, string>({
			query: (bookingId) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingOrder(
					bookingId
				)
			}),
			transformResponse: (response: TOperatorOrderDetailBackend) =>
				mapOperatorBookingOrderToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
			]
		}),
		getOperatorOrderOverview: builder.query<
			TOperatorOrderOverviewBackend,
			string
		>({
			query: (bookingId) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderOverview(
					bookingId
				)
			}),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
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
				const transition = mapOrderStatusToTransition(status);

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
	useGetOperatorOrderOverviewQuery,
	useGetOperatorBookingItineraryQuery,
	useUpdateBookingStatusMutation,
	useDeclineBookingMutation
} = bookingOrderOperatorApi;
