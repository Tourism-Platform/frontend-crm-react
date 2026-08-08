import { HttpResponse } from "msw";

import {
	BOOKING_ORDER_AGENCY_PATHS,
	BOOKING_ORDER_OPERATOR_PATHS,
	BOOKING_ORDER_PATHS,
	BOOKING_ORDER_USER_PATHS,
	BookingTransition,
	createMockHandler
} from "@/shared/api";

import { ensureBookingAvailabilityForBooking } from "../mock/booking-order-availability.mock";
import {
	getClientBookingOrderDetail,
	getOperatorBookingOrderDetail,
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
		BOOKING_ORDER_AGENCY_PATHS.getAgencyBookingOrder(":bookingId"),
		async ({ params }) => {
			const detail = getClientBookingOrderDetail(
				String(params.bookingId)
			);

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(detail);
		}
	),
	createMockHandler(
		BOOKING_ORDER_USER_PATHS.getUserBookingOrder(":bookingId"),
		async ({ params }) => {
			const detail = getClientBookingOrderDetail(
				String(params.bookingId)
			);

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(detail);
		}
	),
	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingOrder(":bookingId"),
		async ({ params }) => {
			const detail = getOperatorBookingOrderDetail(
				String(params.bookingId)
			);

			if (!detail) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(detail);
		}
	),
	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.transitionBookingStatus(
			":bookingId",
			":transition"
		),
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
