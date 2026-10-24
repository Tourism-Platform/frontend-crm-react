import {
	ENUM_GENDER_OPTIONS_BACKEND,
	ENUM_ORDER_STATUS_BACKEND,
	type TBookingPaxBackend
} from "../types";

import { bookingOrderDetailStore } from "./booking-order.store";

const PAX_TEMPLATES = [
	{
		full_name: "Saimon Bill",
		gender: ENUM_GENDER_OPTIONS_BACKEND.MALE,
		nationality: "US",
		date_of_birth: "1988-05-13",
		passport_number: "13213467",
		expired_date: "2029-05-13",
		comment: "Passenger requires a child seat."
	},
	{
		full_name: "Amanda Jally",
		gender: ENUM_GENDER_OPTIONS_BACKEND.FEMALE,
		nationality: "US",
		date_of_birth: "1999-01-17",
		passport_number: "13289067",
		expired_date: "2029-01-17",
		comment: "Allergy to peanuts."
	},
	{
		full_name: "Amad Diallo",
		gender: ENUM_GENDER_OPTIONS_BACKEND.MALE,
		nationality: "CI",
		date_of_birth: "2002-07-11",
		passport_number: "AD998877",
		expired_date: "2032-07-11",
		comment: null
	}
] as const;

const buildPaxId = (bookingId: string, index: number) =>
	`p${bookingId.slice(1, 9)}-${index.toString().padStart(4, "0")}-4000-8000-000000000001`;

const buildFileId = (paxId: string) =>
	`f${paxId.slice(1, 9)}-0001-4000-8000-000000000001`;

const createPaxForBooking = (
	bookingId: string,
	count: number
): TBookingPaxBackend[] =>
	PAX_TEMPLATES.slice(0, count).map((template, index) => {
		const id = buildPaxId(bookingId, index + 1);
		const now = new Date().toISOString();

		return {
			id,
			booking_id: bookingId,
			...template,
			created_at: now,
			updated_at: now,
			files: [
				{
					id: buildFileId(id),
					file_name: `passport_${template.full_name.toLowerCase().replace(/\s+/g, "_")}.pdf`
				}
			]
		};
	});

const buildInitialPaxStore = (): Map<string, TBookingPaxBackend[]> => {
	const store = new Map<string, TBookingPaxBackend[]>();

	for (const detail of bookingOrderDetailStore.values()) {
		if (detail.order.status === ENUM_ORDER_STATUS_BACKEND.CANCELLED)
			continue;
		const count = Math.min(3, Math.max(1, detail.order.pax - 1));
		store.set(detail.order.id, createPaxForBooking(detail.order.id, count));
	}

	return store;
};

export const bookingPaxStore = buildInitialPaxStore();

export const getBookingPaxList = (bookingId: string): TBookingPaxBackend[] =>
	bookingPaxStore.get(bookingId) ?? [];

export const resetBookingPaxStore = (): void => {
	bookingPaxStore.clear();
	buildInitialPaxStore().forEach((pax, bookingId) =>
		bookingPaxStore.set(bookingId, pax)
	);
};

export const setBookingPaxList = (
	bookingId: string,
	pax: TBookingPaxBackend[]
): void => {
	bookingPaxStore.set(bookingId, pax);
};
