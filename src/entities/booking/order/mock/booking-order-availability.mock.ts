import { AvailabilityStatus, BookingStatus } from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "@/entities/tour/itinerary";

import type { TBookingEventAvailabilityBackend } from "../types";

import { getPendingBookingIds } from "./booking-order-pax.mock";
import { MOCK_EVENT_IDS } from "./booking-order.mock.constants";
import { bookingOrderDetailStore } from "./booking-order.store";

const buildAvailabilityRows = (
	bookingId: string
): TBookingEventAvailabilityBackend[] => [
	{
		id: `a1${bookingId.slice(1, 9)}-0001-4000-8000-000000000001`,
		booking_id: bookingId,
		event_id: MOCK_EVENT_IDS.flight,
		option_index: 0,
		status: AvailabilityStatus.Selected,
		event_name: "Flight",
		event_typ: ENUM_EVENT_BACKEND.FLIGHT
	},
	{
		id: `a2${bookingId.slice(1, 9)}-0002-4000-8000-000000000002`,
		booking_id: bookingId,
		event_id: MOCK_EVENT_IDS.multiply,
		option_index: 0,
		status: AvailabilityStatus.Available,
		event_name: "Flight",
		event_typ: ENUM_EVENT_BACKEND.FLIGHT
	},
	{
		id: `a3${bookingId.slice(1, 9)}-0003-4000-8000-000000000003`,
		booking_id: bookingId,
		event_id: MOCK_EVENT_IDS.multiply,
		option_index: 1,
		status: AvailabilityStatus.Pending,
		event_name: "Flight",
		event_typ: ENUM_EVENT_BACKEND.FLIGHT
	},
	{
		id: `a4${bookingId.slice(1, 9)}-0004-4000-8000-000000000004`,
		booking_id: bookingId,
		event_id: MOCK_EVENT_IDS.activity,
		option_index: 0,
		status: AvailabilityStatus.Available,
		event_name: "Flight",
		event_typ: ENUM_EVENT_BACKEND.FLIGHT
	}
];

const buildInitialAvailabilityStore = (): Map<
	string,
	TBookingEventAvailabilityBackend[]
> => {
	const store = new Map<string, TBookingEventAvailabilityBackend[]>();

	for (const bookingId of getPendingBookingIds()) {
		const detail = bookingOrderDetailStore.get(bookingId);
		if (detail?.status === BookingStatus.Pending) {
			store.set(bookingId, buildAvailabilityRows(bookingId));
		}
	}

	return store;
};

export const bookingAvailabilityStore = buildInitialAvailabilityStore();

export const getBookingAvailabilityList = (
	bookingId: string
): TBookingEventAvailabilityBackend[] => {
	const detail = bookingOrderDetailStore.get(bookingId);
	if (detail?.status !== BookingStatus.Pending) return [];
	return bookingAvailabilityStore.get(bookingId) ?? [];
};

export const ensureBookingAvailabilityForBooking = (
	bookingId: string
): void => {
	const detail = bookingOrderDetailStore.get(bookingId);
	if (detail?.status !== BookingStatus.Pending) return;
	if (bookingAvailabilityStore.has(bookingId)) return;
	bookingAvailabilityStore.set(bookingId, buildAvailabilityRows(bookingId));
};

export const updateBookingAvailabilityRow = (
	bookingId: string,
	eventId: string,
	optionIndex: number,
	status: AvailabilityStatus
): TBookingEventAvailabilityBackend | undefined => {
	const rows = bookingAvailabilityStore.get(bookingId);
	if (!rows) return undefined;

	const row = rows.find(
		(r) => r.event_id === eventId && r.option_index === optionIndex
	);
	if (!row) return undefined;

	row.status = status;
	return row;
};
