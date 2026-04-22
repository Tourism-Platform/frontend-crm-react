import { BOOKING_PASSENGER_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapBookingPaxListToFrontend } from "../converters";
import type {
	IBookingPax,
	TAddPassengerResponseBackend,
	TBookingPaxListBackendResponce
} from "../types";

export const bookingPaxApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listPassengerInfo: builder.query<IBookingPax[], string>({
			query: (id) => ({
				...BOOKING_PASSENGER_PATHS.listPassengerInfo(id)
			}),
			transformResponse: (response: TBookingPaxListBackendResponce) =>
				mapBookingPaxListToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${id}` }
			]
		}),
		addPassengerInfo: builder.mutation<
			TAddPassengerResponseBackend,
			{ id: string; data: FormData }
		>({
			query: ({ id, data }) => ({
				...BOOKING_PASSENGER_PATHS.addPassengerInfo(id),
				body: data
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${id}` }
			]
		}),
		getFileBinary: builder.query<Blob, string>({
			query: (id) => ({
				...BOOKING_PASSENGER_PATHS.getFileBinary(id),
				responseHandler: (response) => response.blob()
			})
		}),
		removeFile: builder.mutation<
			void,
			{ fileId: string; bookingId: string }
		>({
			query: ({ fileId }) => ({
				...BOOKING_PASSENGER_PATHS.removeFile(fileId)
			}),
			invalidatesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${bookingId}` }
			]
		})
	})
});

export const {
	useListPassengerInfoQuery,
	useAddPassengerInfoMutation,
	useGetFileBinaryQuery,
	useRemoveFileMutation
} = bookingPaxApi;
