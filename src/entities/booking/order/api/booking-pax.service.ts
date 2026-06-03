import {
	BOOKING_PASSENGER_FILES_PATHS,
	BOOKING_PASSENGER_PATHS,
	ENUM_API_TAGS,
	type PaxCreate,
	type PaxUpdate
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapBookingPaxListToFrontend } from "../converters";
import type {
	IBookingPax,
	IUploadPassengerPassportRequest,
	TAddPassengerResponseBackend,
	TBookingPaxListBackendResponce,
	TUploadPassengerPassportResponse
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
			{ id: string; data: PaxCreate }
		>({
			query: ({ id, data }) => ({
				...BOOKING_PASSENGER_PATHS.addPassengerInfo(id),
				body: data
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${id}` }
			]
		}),
		updatePassengerInfo: builder.mutation<
			TAddPassengerResponseBackend,
			{ bookingId: string; paxId: string; data: PaxUpdate }
		>({
			query: ({ bookingId, paxId, data }) => ({
				...BOOKING_PASSENGER_PATHS.updatePassengerInfo(
					bookingId,
					paxId
				),
				body: data
			}),
			invalidatesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${bookingId}` }
			]
		}),
		deletePassengerInfo: builder.mutation<
			void,
			{ bookingId: string; paxId: string }
		>({
			query: ({ bookingId, paxId }) => ({
				...BOOKING_PASSENGER_PATHS.deletePassengerInfo(bookingId, paxId)
			}),
			invalidatesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${bookingId}` }
			]
		}),
		uploadPassengerPassport: builder.mutation<
			TUploadPassengerPassportResponse,
			IUploadPassengerPassportRequest
		>({
			query: ({ bookingId, paxId, file }) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					...BOOKING_PASSENGER_PATHS.uploadPassengerPassport(
						bookingId,
						paxId
					),
					body: formData
				};
			},
			invalidatesTags: (_result, _error, { bookingId }) => [
				{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: `PAX_${bookingId}` }
			]
		}),
		getFileBinary: builder.query<Blob, string>({
			query: (id) => ({
				...BOOKING_PASSENGER_FILES_PATHS.getFileBinary(id),
				responseHandler: (response) => response.blob()
			})
		}),
		removeFile: builder.mutation<
			void,
			{ fileId: string; bookingId: string }
		>({
			query: ({ fileId }) => ({
				...BOOKING_PASSENGER_FILES_PATHS.removeFile(fileId)
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
	useUpdatePassengerInfoMutation,
	useDeletePassengerInfoMutation,
	useUploadPassengerPassportMutation,
	useGetFileBinaryQuery,
	useRemoveFileMutation
} = bookingPaxApi;
