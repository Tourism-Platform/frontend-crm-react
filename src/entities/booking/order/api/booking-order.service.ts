import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapApplyReviewItemToBackend,
	mapBookingOrderDetailToFrontend,
	mapBookingOrderFiltersToBackend,
	mapBookingOrderPaginatedToFrontend
} from "../converters";
import type {
	IApplyReviewItemRequest,
	IBookingOrderDetailBackend,
	IBookingOrderFilters,
	IOrderDetail,
	TBookingOrderPaginatedResponse,
	TBookingOrderPaginatedResponseBackend
} from "../types";

export const bookingOrderApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBookingOrders: builder.query<
			TBookingOrderPaginatedResponse,
			IBookingOrderFilters | void
		>({
			query: (filters) => ({
				url: "/booking/orders",
				params: filters
					? mapBookingOrderFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (
				response: TBookingOrderPaginatedResponseBackend
			) => mapBookingOrderPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		}),
		getBookingOrderById: builder.query<IOrderDetail, string>({
			query: (id) => `/booking/orders/${id}`,
			transformResponse: (response: IBookingOrderDetailBackend) =>
				mapBookingOrderDetailToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
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
	useGetBookingOrderByIdQuery,
	useApplyReviewItemMutation
} = bookingOrderApi;
