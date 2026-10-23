import { formatDateToISO } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";
import { languageMapper } from "@/entities/tour/landing";

import type {
	IBookingPrice,
	IBookingPriceParams,
	IBookingQuoteParams,
	ICreatedBooking,
	TBookingPriceBackend,
	TBookingPriceQueryBackend,
	TBookingQuoteBackend,
	TBookingQuoteQueryBackend
} from "../types";

export const mapBookingQuoteParamsToBackend = (
	params: IBookingQuoteParams
): TBookingQuoteQueryBackend => ({
	tour_option_id: params.tourOptionId,
	date: formatDateToISO(params.date),
	pax: params.pax,
	lang: languageMapper.to(params.lang),
	currency: currencyConverter.to(params.currency) ?? null
});

export const mapBookingPriceParamsToBackend = (
	params: Omit<IBookingPriceParams, "bookingId">
): TBookingPriceQueryBackend => ({
	pax: params.pax,
	currency: currencyConverter.to(params.currency) ?? null
});

export const mapBookingPriceToFrontend = (
	data: TBookingQuoteBackend | TBookingPriceBackend
): IBookingPrice => ({
	pax: data.pax,
	currency: currencyConverter.from(data.currency)!,
	totalMinPrice: parseFloat(data.total_min_price) || 0
});

export const mapCreatedBookingToPrice = (
	data: ICreatedBooking
): IBookingPrice => ({
	pax: data.pax,
	currency: data.tourCurrency,
	totalMinPrice: parseFloat(data.tourAmount) || 0
});
