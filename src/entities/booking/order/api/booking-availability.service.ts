import {
	ApplyAvailabilityInput,
	BOOKING_AVAILABILITY_PATHS,
	ENUM_API_TAGS
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapBookingAvailabilityListToFrontend,
	mapBookingAvailabilityToFrontend
} from "../converters/booking-availability.converters";
import type { IBookingEventAvailability } from "../types/booking-availability.types";

export const bookingAvailabilityApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listBookingAvailability: builder.query<
			IBookingEventAvailability[],
			string
		>({
			query: (bookingId) => ({
				...BOOKING_AVAILABILITY_PATHS.listBookingAvailability(bookingId)
			}),
			transformResponse: mapBookingAvailabilityListToFrontend,
			providesTags: (_result, _error, bookingId) => [
				{
					type: ENUM_API_TAGS.BOOKING_ORDERS,
					id: `AVAILABILITY_${bookingId}`
				}
			]
		}),
		applyEventAvailability: builder.mutation<
			IBookingEventAvailability,
			{
				bookingId: string;
				eventId: string;
				optionIndex: number;
				status: ApplyAvailabilityInput;
			}
		>({
			query: ({ bookingId, eventId, optionIndex, status }) => ({
				...BOOKING_AVAILABILITY_PATHS.applyEventAvailability(
					bookingId,
					eventId,
					String(optionIndex)
				),
				body: { status }
			}),
			transformResponse: mapBookingAvailabilityToFrontend,
			invalidatesTags: (_result, _error, { bookingId }) => [
				{
					type: ENUM_API_TAGS.BOOKING_ORDERS,
					id: `AVAILABILITY_${bookingId}`
				}
			]
		})
	})
});

export const {
	useListBookingAvailabilityQuery,
	useApplyEventAvailabilityMutation
} = bookingAvailabilityApi;
