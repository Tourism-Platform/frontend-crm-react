import type { BookingCreate } from "@/shared/api";
import { formatDateToISO } from "@/shared/utils";

import type {
	ICreateBookingRequest,
	ICreatedBooking,
	TBookingModelBackend
} from "../types/create-booking.types";

export const mapCreateBookingToBackend = (
	data: ICreateBookingRequest
): BookingCreate => ({
	tour_option_id: data.tourOptionId,
	date: formatDateToISO(data.date),
	pax: data.pax,
	comment: data.comment ?? null
});

export const mapBookingModelToCreated = (
	data: TBookingModelBackend
): ICreatedBooking => ({
	id: data.id,
	tourOptionId: data.tour_option_id,
	date: data.date,
	endDate: data.end_date,
	pax: data.pax,
	tourAmount: data.tour_amount,
	tourCurrency: data.tour_currency
});
