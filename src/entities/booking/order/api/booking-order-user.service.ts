import { BOOKING_ORDER_USER_PATHS, ENUM_API_TAGS } from "@/shared/api";
import { mapOrderLangQueryToBackend } from "@/shared/converters";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapUserBookingOrderToFrontend } from "../converters";
import type {
	IBookingOrderQueryArgs,
	IUserOrderDetail,
	TUserOrderDetailBackend
} from "../types";

export const bookingOrderUserApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserBookingOrder: builder.query<
			IUserOrderDetail,
			IBookingOrderQueryArgs
		>({
			query: ({ bookingId, language }) => ({
				...BOOKING_ORDER_USER_PATHS.getUserBookingOrder(bookingId),
				params: mapOrderLangQueryToBackend(language)
			}),
			transformResponse: (response: TUserOrderDetailBackend) =>
				mapUserBookingOrderToFrontend(response),
			providesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: bookingId }
			]
		})
	})
});

export const { useGetUserBookingOrderQuery } = bookingOrderUserApi;
