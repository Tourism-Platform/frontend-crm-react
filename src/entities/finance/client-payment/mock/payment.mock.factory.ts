import {
	type ClientPaymentFile,
	type ClientPaymentResponse
} from "@/shared/api";

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
			order_number: booking.order_number ?? "",
			client_name: booking.client_name,
			tour_name: booking.tour_name,
			booking_id: booking.id,
			operator_id: MOCK_PAYMENT_DEFAULTS.operator_id,
			amount: row.amount,
			currency: MOCK_PAYMENT_DEFAULTS.currency,
			status: row.status,
			note: row.note ?? null,
			attachment_count: row.attachment_count,
			created_at: row.created_at,
			updated_at: row.created_at
		};
	});

export const createClientPaymentAttachmentMocks = (
	payments: ClientPaymentResponse[]
): Record<string, ClientPaymentFile[]> => {
	const attachments: Record<string, ClientPaymentFile[]> = {};

	for (const payment of payments) {
		if (payment.attachment_count <= 0) {
			attachments[payment.id] = [];
			continue;
		}

		attachments[payment.id] = [
			{
				file_id: `${payment.id}-file-1`,
				file_name: `payment-${payment.order_number || payment.id}.pdf`
			}
		];
	}

	return attachments;
};
