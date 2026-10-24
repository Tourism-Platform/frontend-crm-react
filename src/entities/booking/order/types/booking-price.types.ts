import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";
import type { ENUM_LANGUAGES_TYPE } from "@/entities/tour/landing";

export interface IBookingQuoteArgs {
	tourOptionId: string;
	date: Date | string;
	pax: number;
	lang?: ENUM_LANGUAGES_TYPE;
	currency?: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface IBookingPriceArgs {
	bookingId: string;
	pax: number;
	currency?: ENUM_CURRENCY_OPTIONS_TYPE;
}

/** Цена брони в валюте отображения: и до создания (quote), и после (price) */
export interface IBookingPrice {
	totalMinPrice: string;
	/** Валюта ответа — непринятую бэк молча заменяет на USD */
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	displayCurrencies: ENUM_CURRENCY_OPTIONS_TYPE[];
	pax: number;
}
