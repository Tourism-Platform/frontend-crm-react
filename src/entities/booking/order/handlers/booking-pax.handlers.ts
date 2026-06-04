import { HttpResponse } from "msw";

import {
	Gender,
	type PaxCreate,
	type PaxUpdate,
	createMockHandler
} from "@/shared/api";

import {
	getBookingPaxList,
	setBookingPaxList
} from "../mock/booking-order-pax.mock";

export const bookingPaxHandlers = [
	createMockHandler(
		{
			url: "/booking/order/:bookingId/pax",
			method: "GET"
		},
		async ({ params }) =>
			HttpResponse.json(getBookingPaxList(String(params.bookingId)))
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId/pax",
			method: "POST"
		},
		async ({ params, body }) => {
			const bookingId = String(params.bookingId);
			const data = body as PaxCreate;
			const list = getBookingPaxList(bookingId);
			const created = {
				id: `p${crypto.randomUUID()}`,
				booking_id: bookingId,
				full_name: data.full_name,
				gender: data.gender ?? Gender.M,
				nationality: data.nationality ?? "",
				date_of_birth: data.date_of_birth ?? "1990-01-01",
				passport_number: data.passport_number ?? "",
				expired_date: data.expired_date ?? "2030-01-01",
				comment: data.comment ?? null
			};
			setBookingPaxList(bookingId, [...list, created]);
			return HttpResponse.json(created, { status: 201 });
		}
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId/pax/:paxId",
			method: "PATCH"
		},
		async ({ params, body }) => {
			const bookingId = String(params.bookingId);
			const paxId = String(params.paxId);
			const data = body as PaxUpdate;
			const list = getBookingPaxList(bookingId);
			const index = list.findIndex((p) => p.id === paxId);
			if (index < 0) return new HttpResponse(null, { status: 404 });

			const current = list[index];
			const updated = {
				...current,
				full_name: data.full_name ?? current.full_name,
				gender: data.gender ?? current.gender,
				nationality: data.nationality ?? current.nationality,
				date_of_birth: data.date_of_birth ?? current.date_of_birth,
				passport_number: data.passport_number ?? current.passport_number,
				expired_date: data.expired_date ?? current.expired_date,
				comment:
					data.comment !== undefined ? data.comment : current.comment
			};
			const next = [...list];
			next[index] = updated;
			setBookingPaxList(bookingId, next);
			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId/pax/:paxId",
			method: "DELETE"
		},
		async ({ params }) => {
			const bookingId = String(params.bookingId);
			const paxId = String(params.paxId);
			const list = getBookingPaxList(bookingId).filter((p) => p.id !== paxId);
			setBookingPaxList(bookingId, list);
			return new HttpResponse(null, { status: 204 });
		}
	),
	createMockHandler(
		{
			url: "/booking/order/:bookingId/pax/:paxId/passport",
			method: "POST"
		},
		async () =>
			HttpResponse.json({
				id: crypto.randomUUID(),
				booking_pax_id: crypto.randomUUID(),
				url: "https://example.com/passport-mock.pdf"
			})
	)
];
