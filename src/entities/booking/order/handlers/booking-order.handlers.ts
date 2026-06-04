import { HttpResponse } from "msw";

import {
	BOOKING_ORDER_PATHS,
	BookingTransition,
	createMockHandler
} from "@/shared/api";

import { ensureBookingAvailabilityForBooking } from "../mock/booking-order-availability.mock";
import {
	getBookingOrderDetail,
	listBookingOrders,
	transitionBookingStatusInStore
} from "../mock/booking-order.store";

export const bookingOrderHandlers = [
	createMockHandler(
		BOOKING_ORDER_PATHS.listMyBookings,
		async ({ request }) => {
			const url = new URL(request.url);
			const booking_status = url.searchParams.get("booking_status");
			const q = url.searchParams.get("q");
			const skip = Number(url.searchParams.get("skip")) || 0;
			const limit = Number(url.searchParams.get("limit")) || 10;

			return HttpResponse.json(
				listBookingOrders({
					booking_status,
					q,
					skip,
					limit
				})
			);
		}
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId",
			method: "GET"
		},
		async ({ params }) => {
			const detail = getBookingOrderDetail(String(params.bookingId));

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(detail);
		}
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId/status/:transition",
			method: "PATCH"
		},
		async ({ params }) => {
			const bookingId = String(params.bookingId);
			const transition = String(params.transition) as BookingTransition;
			const updated = transitionBookingStatusInStore(
				bookingId,
				transition
			);

			if (!updated) {
				return new HttpResponse(null, { status: 404 });
			}

			ensureBookingAvailabilityForBooking(bookingId);

			return HttpResponse.json(updated);
		}
	)
];
