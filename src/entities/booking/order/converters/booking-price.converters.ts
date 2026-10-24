import { formatDateToISO } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";
import { languageMapper } from "@/entities/tour/landing";

import type {
	IBookingPrice,
	IBookingPriceArgs,
	IBookingQuoteArgs,
	TBookingPriceBackend,
	TBookingPriceQueryBackend,
	TBookingQuoteBackend,
	TBookingQuoteQueryBackend
} from "../types";

export const mapBookingQuoteQueryToBackend = (
	args: IBookingQuoteArgs
): TBookingQuoteQueryBackend => ({
	tour_option_id: args.tourOptionId,
	date: formatDateToISO(args.date),
	pax: args.pax,
	...(args.lang && { lang: languageMapper.to(args.lang) }),
	...(args.currency && { currency: currencyConverter.to(args.currency) })
});

export const mapBookingPriceQueryToBackend = (
	args: IBookingPriceArgs
): TBookingPriceQueryBackend => ({
	pax: args.pax,
	...(args.currency && { currency: currencyConverter.to(args.currency) })
});

const mapPriceToFrontend = (
	data: TBookingQuoteBackend | TBookingPriceBackend
): IBookingPrice => ({
	totalMinPrice: data.total_min_price,
	currency: currencyConverter.from(data.currency)!,
	displayCurrencies: currencyConverter.fromMany(data.display_currencies),
	pax: data.pax
});

export const mapBookingQuoteToFrontend = (
	data: TBookingQuoteBackend
): IBookingPrice => mapPriceToFrontend(data);

export const mapBookingPriceToFrontend = (
	data: TBookingPriceBackend
): IBookingPrice => mapPriceToFrontend(data);
