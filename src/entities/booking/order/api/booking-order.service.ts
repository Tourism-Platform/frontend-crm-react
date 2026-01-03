import { ENUM_API_TAGS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapBookingOrderFiltersToBackend,
	mapBookingOrderPaginatedToFrontend
} from "../converters/booking-order.converters";
import type {
	IBookingOrderBackend,
	IBookingOrderFilters,
	IOrder
} from "../types";

export const bookingOrderApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBookingOrders: builder.query<
			IPaginationResponse<IOrder>,
			IBookingOrderFilters | void
		>({
			query: (filters) => ({
				url: "/booking/orders",
				params: filters
					? mapBookingOrderFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (
				response: IPaginationResponse<IBookingOrderBackend>
			) => mapBookingOrderPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		})
	})
});

export const { useGetBookingOrdersQuery } = bookingOrderApi;
