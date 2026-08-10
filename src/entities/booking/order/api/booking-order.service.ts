import { BOOKING_ORDER_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapBookingModelToCreated,
	mapBookingModelToUpdated,
	mapBookingOrderFiltersToBackend,
	mapBookingOrderPaginatedToFrontend,
	mapCreateBookingToBackend,
	mapUpdateBookingToBackend
} from "../converters";
import type {
	IBookingOrderFilters,
	ICreateBookingRequest,
	ICreatedBooking,
	IUpdateBookingRequest,
	IUpdatedBooking,
	TBookingCancelBackend,
	TBookingItineraryBackend,
	TBookingModelBackend,
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
		getBookingItinerary: builder.query<TBookingItineraryBackend, string>({
			query: (bookingId) => ({
				...BOOKING_ORDER_PATHS.getBookingItinerary(bookingId)
			}),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
			]
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
			transformResponse: (response: TBookingModelBackend) =>
				mapBookingModelToCreated(response),
			invalidatesTags: (_result, _error, bookingId) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: bookingId },
				ENUM_API_TAGS.BOOKING_ORDERS
			]
		}),
		cancelBooking: builder.mutation<
			TBookingModelBackend,
			{ id: string; data: TBookingCancelBackend }
		>({
			query: ({ id, data }) => ({
				...BOOKING_ORDER_PATHS.cancelBooking(id),
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
	useGetBookingOrdersQuery,
	useGetBookingItineraryQuery,
	useCreateBookingOrderMutation,
	useUpdateBookingOrderMutation,
	useSubmitBookingOrderMutation,
	useCancelBookingMutation
} = bookingOrderApi;
