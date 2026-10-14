import { BOOKING_ORDER_AGENCY_PATHS, ENUM_API_TAGS } from "@/shared/api";
import { mapOrderLangQueryToBackend } from "@/shared/converters";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapAgencyBookingOrderToFrontend } from "../converters";
import type {
	IAgencyOrderDetail,
	IBookingOrderQueryArgs,
	TAgencyOrderDetailBackend
} from "../types";

export const bookingOrderAgencyApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAgencyBookingOrder: builder.query<
			IAgencyOrderDetail,
			IBookingOrderQueryArgs
		>({
			query: ({ bookingId, language }) => ({
				...BOOKING_ORDER_AGENCY_PATHS.getAgencyBookingOrder(bookingId),
				params: mapOrderLangQueryToBackend(language)
			}),
			transformResponse: (response: TAgencyOrderDetailBackend) =>
				mapAgencyBookingOrderToFrontend(response),
			providesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: bookingId }
			]
		})
	})
});

export const { useGetAgencyBookingOrderQuery } = bookingOrderAgencyApi;
