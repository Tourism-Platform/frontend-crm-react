import { type ClientPaymentResponse, ClientPaymentStatus } from "@/shared/api";

import { bookingOrderListItems } from "@/entities/booking/order/mock/booking-order.store";

import {
	MOCK_PAYMENT_DEFAULTS,
	buildPaymentUuid
} from "./payment.mock.constants";

const SEED_ROWS: {
	amount: number;
	status: ClientPaymentStatus;
	note?: string;
	has_attachment: boolean;
	created_at: string;
}[] = [
	{
		amount: 1500,
		status: ClientPaymentStatus.Confirmed,
		note: "First payment",
		has_attachment: true,
		created_at: "2024-12-01T10:00:00Z"
	},
	{
		amount: 2300,
		status: ClientPaymentStatus.NotConfirmed,
		note: "Pending payment",
		has_attachment: false,
		created_at: "2024-12-05T14:30:00Z"
	},
	{
		amount: 750,
		status: ClientPaymentStatus.Confirmed,
		has_attachment: false,
		created_at: "2024-12-10T09:15:00Z"
	},
	{
		amount: 3100,
		status: ClientPaymentStatus.NotConfirmed,
		has_attachment: false,
		created_at: "2024-12-15T16:45:00Z"
	},
	{
		amount: 1250,
		status: ClientPaymentStatus.Confirmed,
		has_attachment: false,
		created_at: "2024-12-20T11:20:00Z"
	},
	{
		amount: 500,
		status: ClientPaymentStatus.NotConfirmed,
		note: "Partially paid",
		has_attachment: false,
		created_at: "2024-12-21T09:00:00Z"
	},
	{
		amount: 4200,
		status: ClientPaymentStatus.Confirmed,
		has_attachment: false,
		created_at: "2024-12-22T14:15:00Z"
	},
	{
		amount: 1100,
		status: ClientPaymentStatus.NotConfirmed,
		note: "Awaiting confirmation",
		has_attachment: false,
		created_at: "2024-12-23T11:45:00Z"
	},
	{
		amount: 2750,
		status: ClientPaymentStatus.Confirmed,
		has_attachment: false,
		created_at: "2024-12-24T16:30:00Z"
	},
	{
		amount: 3500,
		status: ClientPaymentStatus.NotConfirmed,
		has_attachment: false,
		created_at: "2024-12-25T10:00:00Z"
	}
];

export const createClientPaymentMocks = (): ClientPaymentResponse[] =>
	SEED_ROWS.map((row, index) => {
		const booking =
			bookingOrderListItems[index % bookingOrderListItems.length];

		return {
			id: buildPaymentUuid(index + 1),
			order_number: booking.order_number,
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
