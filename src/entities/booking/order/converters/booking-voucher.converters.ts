import type { IBookingVoucher, TBookingVoucherBackend } from "../types";

export const mapBookingVoucherToFrontend = (
	voucher: TBookingVoucherBackend
): IBookingVoucher => ({
	bookingId: voucher.booking_id,
	orderNumber: voucher.order_number,
	url: voucher.url,
	fileName: voucher.file_name
});
