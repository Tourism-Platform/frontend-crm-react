import { BOOKING_VOUCHER_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapBookingVoucherToFrontend } from "../converters";
import type {
	IBookingVoucher,
	IUploadBookingVoucherRequest,
	TBookingVoucherBackend
} from "../types";

const voucherTag = (bookingId: string) =>
	({
		type: ENUM_API_TAGS.BOOKING_ORDERS,
		id: `VOUCHER_${bookingId}`
	}) as const;

export const bookingVoucherApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getVoucher: builder.query<IBookingVoucher, string>({
			query: (bookingId) => ({
				...BOOKING_VOUCHER_PATHS.getVoucher(bookingId)
			}),
			transformResponse: (response: TBookingVoucherBackend) =>
				mapBookingVoucherToFrontend(response),
			providesTags: (_result, _error, bookingId) => [
				voucherTag(bookingId)
			]
		}),
		uploadVoucher: builder.mutation<
			IBookingVoucher,
			IUploadBookingVoucherRequest
		>({
			query: ({ bookingId, file }) => {
				const formData = new FormData();
				formData.append("file", file);

				return {
					...BOOKING_VOUCHER_PATHS.uploadVoucher(bookingId),
					body: formData
				};
			},
			transformResponse: (response: TBookingVoucherBackend) =>
				mapBookingVoucherToFrontend(response),
			invalidatesTags: (_result, _error, { bookingId }) => [
				voucherTag(bookingId)
			]
		}),
		deleteVoucher: builder.mutation<void, string>({
			query: (bookingId) => ({
				...BOOKING_VOUCHER_PATHS.deleteVoucher(bookingId)
			}),
			invalidatesTags: (_result, _error, bookingId) => [
				voucherTag(bookingId)
			]
		})
	})
});

export const {
	useGetVoucherQuery,
	useUploadVoucherMutation,
	useDeleteVoucherMutation
} = bookingVoucherApi;
