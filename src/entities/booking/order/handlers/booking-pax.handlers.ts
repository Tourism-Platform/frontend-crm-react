import { HttpResponse } from "msw";

import {
	BOOKING_PASSENGER_FILES_PATHS,
	BOOKING_PASSENGER_PATHS,
	createMockHandler
} from "@/shared/api";

import {
	getBookingPaxList,
	setBookingPaxList
} from "../mock/booking-order-pax.mock";
import {
	ENUM_GENDER_OPTIONS_BACKEND,
	type TPaxCreateBackend,
	type TPaxUpdateBackend
} from "../types";

export const bookingPaxHandlers = [
	createMockHandler(
		BOOKING_PASSENGER_PATHS.listPassengerInfo(":bookingId"),
		async ({ params }) => {
			const data = getBookingPaxList(String(params.bookingId));
			return HttpResponse.json({ count: data.length, data });
		}
	),
	createMockHandler(
		BOOKING_PASSENGER_PATHS.addPassengerInfo(":bookingId"),
		async ({ params, body }) => {
			const bookingId = String(params.bookingId);
			const data = body as TPaxCreateBackend;
			const list = getBookingPaxList(bookingId);
			const now = new Date().toISOString();
			const created = {
				id: `p${crypto.randomUUID()}`,
				booking_id: bookingId,
				full_name: data.full_name,
				gender: data.gender ?? ENUM_GENDER_OPTIONS_BACKEND.MALE,
				nationality: data.nationality ?? "",
				date_of_birth: data.date_of_birth ?? "1990-01-01",
				passport_number: data.passport_number ?? "",
				expired_date: data.expired_date ?? "2030-01-01",
				comment: data.comment ?? null,
				created_at: now,
				updated_at: now,
				files: [] as { id: string; file_name: string }[]
			};
			setBookingPaxList(bookingId, [...list, created]);
			return HttpResponse.json(created, { status: 201 });
		}
	),
	createMockHandler(
		BOOKING_PASSENGER_PATHS.updatePassengerInfo(":bookingId", ":paxId"),
		async ({ params, body }) => {
			const bookingId = String(params.bookingId);
			const paxId = String(params.paxId);
			const data = body as TPaxUpdateBackend;
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
				passport_number:
					data.passport_number ?? current.passport_number,
				expired_date: data.expired_date ?? current.expired_date,
				comment:
					data.comment !== undefined ? data.comment : current.comment,
				updated_at: new Date().toISOString()
			};
			const next = [...list];
			next[index] = updated;
			setBookingPaxList(bookingId, next);
			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		BOOKING_PASSENGER_PATHS.deletePassengerInfo(":bookingId", ":paxId"),
		async ({ params }) => {
			const bookingId = String(params.bookingId);
			const paxId = String(params.paxId);
			const list = getBookingPaxList(bookingId).filter(
				(p) => p.id !== paxId
			);
			setBookingPaxList(bookingId, list);
			return new HttpResponse(null, { status: 204 });
		}
	),
	createMockHandler(
		BOOKING_PASSENGER_PATHS.uploadPassengerPassport(":bookingId", ":paxId"),
		async ({ params }) => {
			const bookingId = String(params.bookingId);
			const paxId = String(params.paxId);
			const list = getBookingPaxList(bookingId);
			const index = list.findIndex((p) => p.id === paxId);
			const fileId = crypto.randomUUID();
			const fileName = "passport.pdf";

			if (index >= 0) {
				const current = list[index];
				const next = [...list];
				next[index] = {
					...current,
					files: [
						...current.files,
						{ id: fileId, file_name: fileName }
					],
					updated_at: new Date().toISOString()
				};
				setBookingPaxList(bookingId, next);
			}

			return HttpResponse.json({
				id: fileId,
				booking_pax_id: paxId,
				url: "https://example.com/passport-mock.pdf",
				file_name: fileName
			});
		}
	),
	createMockHandler(
		BOOKING_PASSENGER_FILES_PATHS.getFileBinary(":fileId"),
		async () => {
			const content = "%PDF-1.4 mock passport file";
			return new HttpResponse(content, {
				status: 200,
				headers: {
					"Content-Type": "application/pdf",
					"Content-Disposition": 'attachment; filename="passport.pdf"'
				}
			});
		}
	),
	createMockHandler(
		BOOKING_PASSENGER_FILES_PATHS.removeFile(":fileId"),
		async () => new HttpResponse(null, { status: 204 })
	)
];
