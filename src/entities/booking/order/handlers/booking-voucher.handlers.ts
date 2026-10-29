import { HttpResponse } from "msw";

import {
	BOOKING_VOUCHER_PATHS,
	createMockHandler,
	mockNoContent,
	mockNotFound,
	readFormFiles
} from "@/shared/api";

import { getBookingOrderDetail } from "../mock/booking-order.store";
import {
	deleteVoucherFromStore,
	getVoucherFromStore,
	setVoucherInStore
} from "../mock/booking-voucher.store";

export const bookingVoucherHandlers = [
	createMockHandler(
		BOOKING_VOUCHER_PATHS.getVoucher(":bookingId"),
		({ params }) => {
			const voucher = getVoucherFromStore(String(params.bookingId));
			return voucher
				? HttpResponse.json(voucher)
				: mockNotFound("Voucher not found");
		}
	),
	createMockHandler(
		BOOKING_VOUCHER_PATHS.uploadVoucher(":bookingId"),
		async ({ params, request }) => {
			const booking = getBookingOrderDetail(
				String(params.bookingId)
			)?.order;
			if (!booking) return mockNotFound("Booking not found");

			const [file] = await readFormFiles(request);
			const fileName = file?.name || "voucher.pdf";
			const voucher = setVoucherInStore({
				booking_id: booking.id,
				order_number: booking.order_number,
				url: `https://example.com/vouchers/${booking.order_number}/${fileName}`,
				file_name: fileName
			});

			return HttpResponse.json(voucher, { status: 201 });
		}
	),
	createMockHandler(
		BOOKING_VOUCHER_PATHS.deleteVoucher(":bookingId"),
		({ params }) =>
			deleteVoucherFromStore(String(params.bookingId))
				? mockNoContent()
				: mockNotFound("Voucher not found")
	)
];
