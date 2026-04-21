import {
	BOOKING_ORDER_PATHS,
	type BookingCancel,
	type BookingStatus,
	ENUM_API_TAGS
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapApplyReviewItemToBackend,
	mapBookingOrderDetailToFrontend,
	mapBookingOrderFiltersToBackend,
	mapBookingOrderPaginatedToFrontend,
	mapBookingOrderToBackend
} from "../converters";
import type {
	IApplyReviewItemRequest,
	IBookingOrderDetailBackend,
	IBookingOrderFilters,
	IOrder,
	IOrderDetail,
	TBookingOrderBackend,
	TBookingOrderBackendResponse,
	TBookingOrderPaginatedResponse
} from "../types";

export const bookingOrderApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBookingOrders: builder.query<
			TBookingOrderPaginatedResponse,
			IBookingOrderFilters
		>({
			query: (filters) => ({
				...BOOKING_ORDER_PATHS.listMyBookings,
				params: mapBookingOrderFiltersToBackend(filters)
			}),
			transformResponse: (response: TBookingOrderBackendResponse) =>
				mapBookingOrderPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		}),
		createBookingOrder: builder.mutation<IOrder, IOrderDetail>({
			query: (body) => ({
				...BOOKING_ORDER_PATHS.createBookingOrder,
				body: mapBookingOrderToBackend(body)
			}),
			transformResponse: (response: IBookingOrderDetailBackend) =>
				mapBookingOrderDetailToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		}),
		getBookingOrderById: builder.query<IOrderDetail, string>({
			query: (id) => ({
				...BOOKING_ORDER_PATHS.getBookingOrder(id)
			}),
			transformResponse: (response: TBookingOrderBackend) =>
				mapBookingOrderDetailToFrontend(
					response as IBookingOrderDetailBackend
				),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
			]
		}),
		updateBookingStatus: builder.mutation<
			IOrderDetail,
			{ id: string; status: BookingStatus }
		>({
			query: ({ id, status }) => ({
				...BOOKING_ORDER_PATHS.updateBookingStatus(id),
				params: { status }
			}),
			transformResponse: (response: TBookingOrderBackend) =>
				mapBookingOrderDetailToFrontend(
					response as IBookingOrderDetailBackend
				),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id },
				ENUM_API_TAGS.BOOKING_ORDERS
			]
		}),
		cancelBooking: builder.mutation<
			IOrderDetail,
			{ id: string; data: BookingCancel }
		>({
			query: ({ id, data }) => ({
				...BOOKING_ORDER_PATHS.cancelBooking(id),
				body: data
			}),
			transformResponse: (response: TBookingOrderBackend) =>
				mapBookingOrderDetailToFrontend(
					response as IBookingOrderDetailBackend
				),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id },
				ENUM_API_TAGS.BOOKING_ORDERS
			]
		}),
		applyReviewItem: builder.mutation<void, IApplyReviewItemRequest>({
			query: (body) => ({
				url: "/booking/orders/apply-review",
				method: "POST",
				body: mapApplyReviewItemToBackend(body)
			}),
			invalidatesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		})
	})
});

export const {
	useGetBookingOrdersQuery,
	useCreateBookingOrderMutation,
	useGetBookingOrderByIdQuery,
	useUpdateBookingStatusMutation,
	useCancelBookingMutation,
	useApplyReviewItemMutation
} = bookingOrderApi;
