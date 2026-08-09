import { type ClientPaymentResponse } from "@/shared/api";

import { bookingOrderListItems } from "@/entities/booking/order/mock/booking-order.store";

import { CLIENT_PAYMENT_SEED } from "./client-payment.seed";
import {
	MOCK_PAYMENT_DEFAULTS,
	buildPaymentUuid
} from "./payment.mock.constants";

export const createClientPaymentMocks = (): ClientPaymentResponse[] =>
	CLIENT_PAYMENT_SEED.map((row, index) => {
		const booking =
			bookingOrderListItems[index % bookingOrderListItems.length];

		return {
			id: buildPaymentUuid(index + 1),
			order_number: booking.order_number,
			client_name: booking.client_name,
			tour_name: booking.tour_name,
			booking_id: booking.id,
			operator_id: MOCK_PAYMENT_DEFAULTS.operator_id,
			amount: row.amount,
			currency: MOCK_PAYMENT_DEFAULTS.currency,
			status: row.status,
			note: row.note ?? null,
			has_attachment: row.has_attachment,
			created_at: row.created_at,
			updated_at: row.created_at
		};
	});
