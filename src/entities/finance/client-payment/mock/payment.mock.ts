import { ClientPaymentStatus, CurrencyCode } from "@/shared/api";

import { type TPaymentBackendResponse } from "../types";

export const PAYMENTS_MOCK: TPaymentBackendResponse = {
	total_count: 10,
	data: [
		{
			id: "1",
			booking_id: "ORD-12345",
			operator_id: "op-1",
			amount: 1500,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.Confirmed,
			note: "First payment",
			has_attachment: true,
			created_at: "2024-12-01T10:00:00Z"
		},
		{
			id: "2",
			booking_id: "ORD-12346",
			operator_id: "op-1",
			amount: 2300,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.NotConfirmed,
			note: "Pending payment",
			has_attachment: false,
			created_at: "2024-12-05T14:30:00Z"
		},
		{
			id: "3",
			booking_id: "ORD-12347",
			operator_id: "op-1",
			amount: 750,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.Confirmed,
			has_attachment: false,
			created_at: "2024-12-10T09:15:00Z"
		},
		{
			id: "4",
			booking_id: "ORD-12348",
			operator_id: "op-1",
			amount: 3100,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.NotConfirmed,
			has_attachment: false,
			created_at: "2024-12-15T16:45:00Z"
		},
		{
			id: "5",
			booking_id: "ORD-12349",
			operator_id: "op-1",
			amount: 1250,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.Confirmed,
			has_attachment: false,
			created_at: "2024-12-20T11:20:00Z"
		},
		{
			id: "6",
			booking_id: "ORD-12350",
			operator_id: "op-1",
			amount: 500,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.NotConfirmed,
			note: "Partially paid",
			has_attachment: false,
			created_at: "2024-12-21T09:00:00Z"
		},
		{
			id: "7",
			booking_id: "ORD-12351",
			operator_id: "op-1",
			amount: 4200,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.Confirmed,
			has_attachment: false,
			created_at: "2024-12-22T14:15:00Z"
		},
		{
			id: "8",
			booking_id: "ORD-12352",
			operator_id: "op-1",
			amount: 1100,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.NotConfirmed,
			note: "Awaiting confirmation",
			has_attachment: false,
			created_at: "2024-12-23T11:45:00Z"
		},
		{
			id: "9",
			booking_id: "ORD-12353",
			operator_id: "op-1",
			amount: 2750,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.Confirmed,
			has_attachment: false,
			created_at: "2024-12-24T16:30:00Z"
		},
		{
			id: "10",
			booking_id: "ORD-12354",
			operator_id: "op-1",
			amount: 3500,
			currency: CurrencyCode.USD,
			status: ClientPaymentStatus.NotConfirmed,
			has_attachment: false,
			created_at: "2024-12-25T10:00:00Z"
		}
	]
};
