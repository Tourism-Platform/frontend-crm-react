import {
	BOOKING_ORDER_PATHS,
	type BookingCancel,
	type BookingModel,
	ENUM_API_TAGS
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapApplyReviewItemToBackend,
	mapBookingModelToCreated,
	mapBookingModelToUpdated,
	mapBookingOrderDetailToFrontend,
	mapBookingOrderFiltersToBackend,
	mapBookingOrderPaginatedToFrontend,
	mapCreateBookingToBackend,
	mapUpdateBookingToBackend
} from "../converters";
import type {
	IApplyReviewItemRequest,
	IBookingOrderDetailBackend,
	IBookingOrderFilters,
	ICreateBookingRequest,
	ICreatedBooking,
	IOrderDetail,
	IUpdateBookingRequest,
	IUpdatedBooking,
	TBookingModelBackend,
	TBookingOrderBackend,
	TBookingOrderBackendResponse,
	TBookingOrderPaginatedResponse,
	TSubmittedBooking
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
		createBookingOrder: builder.mutation<
			ICreatedBooking,
			ICreateBookingRequest
		>({
			query: (body) => ({
				...BOOKING_ORDER_PATHS.createBookingOrder,
				body: mapCreateBookingToBackend(body)
			}),
			transformResponse: (response: TBookingModelBackend) =>
				mapBookingModelToCreated(response),
			invalidatesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		}),
		updateBookingOrder: builder.mutation<
			IUpdatedBooking,
			IUpdateBookingRequest
		>({
			query: (body) => ({
				...BOOKING_ORDER_PATHS.updateBookingOrder(body.id),
				body: mapUpdateBookingToBackend(body)
			}),
			transformResponse: (response: TBookingModelBackend) =>
				mapBookingModelToUpdated(response),
			invalidatesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		}),
		submitBookingOrder: builder.mutation<TSubmittedBooking, string>({
			query: (bookingId) => ({
				...BOOKING_ORDER_PATHS.submitBookingOrder(bookingId)
			}),
			transformResponse: (response: BookingModel) =>
				mapBookingModelToCreated(response),
			invalidatesTags: (_result, _error, bookingId) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: bookingId },
				ENUM_API_TAGS.BOOKING_ORDERS
			]
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
			{ id: string; status: string }
		>({
			query: ({ id, status }) => ({
				...BOOKING_ORDER_PATHS.transitionBookingStatus(id, status)
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
	useUpdateBookingOrderMutation,
	useSubmitBookingOrderMutation,
	useGetBookingOrderByIdQuery,
	useUpdateBookingStatusMutation,
	useCancelBookingMutation,
	useApplyReviewItemMutation
} = bookingOrderApi;
