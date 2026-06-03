import type { BookingUpdate } from "@/shared/api";
import { formatDateToISO } from "@/shared/utils";

import type { TBookingModelBackend } from "../types/create-booking.types";
import type {
	IUpdateBookingRequest,
	IUpdatedBooking
} from "../types/update-booking.types";

export const mapUpdateBookingToBackend = (
	data: IUpdateBookingRequest
): BookingUpdate => ({
	date: formatDateToISO(data.date),
	pax: data.pax,
	comment: data.comment ?? null
});

export const mapBookingModelToUpdated = (
	data: TBookingModelBackend
): IUpdatedBooking => ({
	id: data.id,
	tourOptionId: data.tour_option_id,
	date: data.date,
	endDate: data.end_date,
	pax: data.pax,
	tourAmount: data.tour_amount,
	tourCurrency: data.tour_currency
});
