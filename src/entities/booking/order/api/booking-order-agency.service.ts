import { BOOKING_ORDER_AGENCY_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapAgencyBookingOrderToFrontend } from "../converters";
import type { IAgencyOrderDetail, TAgencyOrderDetailBackend } from "../types";

export const bookingOrderAgencyApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAgencyBookingOrder: builder.query<IAgencyOrderDetail, string>({
			query: (bookingId) => ({
				...BOOKING_ORDER_AGENCY_PATHS.getAgencyBookingOrder(bookingId)
			}),
			transformResponse: (response: TAgencyOrderDetailBackend) =>
				mapAgencyBookingOrderToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id }
			]
		})
	})
});

export const { useGetAgencyBookingOrderQuery } = bookingOrderAgencyApi;
