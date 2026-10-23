import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";
import type { ENUM_LANGUAGES_TYPE } from "@/entities/tour/landing";

export interface IBookingQuoteParams {
	tourOptionId: string;
	date: Date | string;
	pax: number;
	lang: ENUM_LANGUAGES_TYPE;
	currency?: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface IBookingPriceParams {
	bookingId: string;
	pax: number;
	currency?: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface IBookingPrice {
	pax: number;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	totalMinPrice: number;
}
