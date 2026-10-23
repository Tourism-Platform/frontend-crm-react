import { HttpResponse } from "msw";

import {
	BOOKING_ORDER_AGENCY_PATHS,
	BOOKING_ORDER_OPERATOR_PATHS,
	BOOKING_ORDER_PATHS,
	BOOKING_ORDER_USER_PATHS,
	BookingStatus,
	BookingTransition,
	LanguageCode,
	createMockHandler,
	mockBadRequest,
	mockNoContent,
	mockNotFound,
	mockUnauthorized,
	mockValidationError,
	parseSkipLimit
} from "@/shared/api";

import { getMockSessionAccount } from "@/entities/auth/mock/auth.store";
import { PREVIEW_OPTION_BACKEND_MOCK } from "@/entities/tour/preview-tour/mock/preview-option-pub.fixtures";

import {
	closeBookingOrder,
	createBookingOrder,
	deleteBookingOrder,
	getBookingOrderDetail,
	getClientBookingOrderDetail,
	getOperatorBookingOrderDetail,
	listBookingOrders,
	transitionBookingStatusInStore,
	updateBookingOrder
} from "../mock/booking-order.store";
import { getOperatorItinerary } from "../mock/booking-snapshot.store";

const BOOKING_NOT_FOUND = "Booking not found";

const orderResult = (order: unknown) =>
	order ? HttpResponse.json(order) : mockNotFound(BOOKING_NOT_FOUND);

export const bookingOrderHandlers = [
	createMockHandler(BOOKING_ORDER_PATHS.listMyBookings, ({ query }) =>
		HttpResponse.json(
			listBookingOrders({
				booking_status: query.get("booking_status"),
				q: query.get("q"),
				...parseSkipLimit(query)
			})
		)
	),

	createMockHandler(BOOKING_ORDER_PATHS.createBookingOrder, ({ body }) => {
		const account = getMockSessionAccount();
		if (!account) return mockUnauthorized();
		if (!body.tour_option_id || !body.date || !body.pax) {
			return mockValidationError(
				["body", "tour_option_id"],
				"Field required"
			);
		}

		return HttpResponse.json(
			createBookingOrder(body, {
				agencyId: account.agency_id,
				userId: account.agency_id ? null : account.id,
				name: account.email
			}),
			{ status: 201 }
		);
	}),

	createMockHandler(
		BOOKING_ORDER_PATHS.updateBookingOrder(":bookingId"),
		({ params, body }) =>
			orderResult(updateBookingOrder(String(params.bookingId), body))
	),

	createMockHandler(
		BOOKING_ORDER_PATHS.submitBookingOrder(":bookingId"),
		({ params }) => {
			const bookingId = String(params.bookingId);
			if (!getBookingOrderDetail(bookingId))
				return mockNotFound(BOOKING_NOT_FOUND);
			const order = transitionBookingStatusInStore(
				bookingId,
				BookingTransition.Submit
			);
			return order
				? HttpResponse.json(order)
				: mockBadRequest("Booking is not a draft");
		}
	),

	createMockHandler(
		BOOKING_ORDER_PATHS.cancelBooking(":bookingId"),
		({ params, body }) =>
			orderResult(
				closeBookingOrder(
					String(params.bookingId),
					BookingStatus.Cancelled,
					body.reason ?? null
				)
			)
	),

	createMockHandler(
		BOOKING_ORDER_PATHS.deleteBookingOrder(":bookingId"),
		({ params }) =>
			deleteBookingOrder(String(params.bookingId))
				? mockNoContent()
				: mockNotFound(BOOKING_NOT_FOUND)
	),

	// Клиентский маршрут: публичное представление опции тура
	createMockHandler(
		BOOKING_ORDER_PATHS.getBookingItinerary(":bookingId"),
		({ params }) => {
			const detail = getBookingOrderDetail(String(params.bookingId));
			if (!detail) return mockNotFound(BOOKING_NOT_FOUND);

			return HttpResponse.json({
				booking_id: detail.order.id,
				order_number: detail.order.order_number,
				display_lang: LanguageCode.En,
				events: PREVIEW_OPTION_BACKEND_MOCK.events
			});
		}
	),

	createMockHandler(
		BOOKING_ORDER_AGENCY_PATHS.getAgencyBookingOrder(":bookingId"),
		({ params }) =>
			orderResult(getClientBookingOrderDetail(String(params.bookingId)))
	),

	createMockHandler(
		BOOKING_ORDER_USER_PATHS.getUserBookingOrder(":bookingId"),
		({ params }) =>
			orderResult(getClientBookingOrderDetail(String(params.bookingId)))
	),

	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingOrder(":bookingId"),
		({ params }) =>
			orderResult(getOperatorBookingOrderDetail(String(params.bookingId)))
	),

	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingItinerary(":bookingId"),
		({ params }) =>
			orderResult(getOperatorItinerary(String(params.bookingId)))
	),

	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.transitionBookingStatus(
			":bookingId",
			":transition"
		),
		({ params }) => {
			const bookingId = String(params.bookingId);
			if (!getBookingOrderDetail(bookingId))
				return mockNotFound(BOOKING_NOT_FOUND);

			const order = transitionBookingStatusInStore(
				bookingId,
				String(params.transition) as BookingTransition
			);
			return order
				? HttpResponse.json(order)
				: mockBadRequest(
						"Transition is not allowed for current status"
					);
		}
	),

	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.declineBooking(":bookingId"),
		({ params, body }) =>
			orderResult(
				closeBookingOrder(
					String(params.bookingId),
					BookingStatus.Declined,
					body.reason ?? null
				)
			)
	)
];
