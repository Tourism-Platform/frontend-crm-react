import type {
	BodyUploadVoucherBookingVoucherBookingIdPost,
	VoucherResponse
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_VOUCHER_PATHS = {
	getVoucher: (bookingId: string) =>
		({
			url: `/booking/voucher/${bookingId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: VoucherResponse }
		}) as const,
	uploadVoucher: (bookingId: string) =>
		({
			url: `/booking/voucher/${bookingId}`,
			method: "POST",
			_types: {} as {
				body: BodyUploadVoucherBookingVoucherBookingIdPost;
				query: void;
				response: VoucherResponse;
			}
		}) as const,
	deleteVoucher: (bookingId: string) =>
		({
			url: `/booking/voucher/${bookingId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
