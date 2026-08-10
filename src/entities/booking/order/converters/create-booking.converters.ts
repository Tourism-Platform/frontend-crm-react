import { formatDateToISO } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";
import { languageMapper } from "@/entities/tour/landing";

import type {
	ICreateBookingRequest,
	ICreatedBooking,
	TBookingCreateBackend,
	TBookingModelBackend
} from "../types";

export const mapCreateBookingToBackend = (
	data: ICreateBookingRequest
): TBookingCreateBackend => ({
	tour_option_id: data.tourOptionId,
	date: formatDateToISO(data.date),
	pax: data.pax,
	lang: languageMapper.to(data.lang)!,
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
	tourCurrency: currencyConverter.from(data.tour_currency)!
});
