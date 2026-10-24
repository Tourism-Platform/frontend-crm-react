import { describe, expect, it } from "vitest";

import {
	ENUM_CURRENCY_BACKEND,
	ENUM_CURRENCY_OPTIONS
} from "@/entities/commission/types/currency.types";
import {
	ENUM_LANGUAGES,
	ENUM_LANGUAGES_BACKEND
} from "@/entities/tour/landing/types/languages.types";

import {
	mapBookingPriceQueryToBackend,
	mapBookingPriceToFrontend,
	mapBookingQuoteQueryToBackend,
	mapBookingQuoteToFrontend
} from "./booking-price.converters";

describe("mapBookingQuoteQueryToBackend", () => {
	it("maps required fields and omits empty optionals", () => {
		expect(
			mapBookingQuoteQueryToBackend({
				tourOptionId: "opt-1",
				date: new Date(2026, 10, 20),
				pax: 2
			})
		).toEqual({ tour_option_id: "opt-1", date: "2026-11-20", pax: 2 });
	});

	it("maps lang and currency to backend codes", () => {
		expect(
			mapBookingQuoteQueryToBackend({
				tourOptionId: "opt-1",
				date: "2026-11-20",
				pax: 2,
				lang: ENUM_LANGUAGES.ENGLISH,
				currency: ENUM_CURRENCY_OPTIONS.EUR
			})
		).toMatchObject({
			lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
			currency: ENUM_CURRENCY_BACKEND.EUR
		});
	});
});

describe("mapBookingPriceQueryToBackend", () => {
	it("sends currency only when selected", () => {
		expect(
			mapBookingPriceQueryToBackend({ bookingId: "b-1", pax: 3 })
		).toEqual({ pax: 3 });
		expect(
			mapBookingPriceQueryToBackend({
				bookingId: "b-1",
				pax: 3,
				currency: ENUM_CURRENCY_OPTIONS.UZS
			})
		).toEqual({ pax: 3, currency: ENUM_CURRENCY_BACKEND.UZS });
	});
});

describe("booking price to frontend", () => {
	it("takes currency from the response, not from the request", () => {
		expect(
			mapBookingQuoteToFrontend({
				tour_option_id: "opt-1",
				date: "2026-11-20",
				pax: 2,
				lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
				currency: ENUM_CURRENCY_BACKEND.USD,
				total_min_price: "715.00",
				display_currencies: [
					ENUM_CURRENCY_BACKEND.CNY,
					ENUM_CURRENCY_BACKEND.USD
				]
			})
		).toEqual({
			totalMinPrice: "715.00",
			currency: ENUM_CURRENCY_OPTIONS.USD,
			displayCurrencies: [
				ENUM_CURRENCY_OPTIONS.CNY,
				ENUM_CURRENCY_OPTIONS.USD
			],
			pax: 2
		});
	});

	it("maps booking price", () => {
		expect(
			mapBookingPriceToFrontend({
				booking_id: "b-1",
				pax: 3,
				currency: ENUM_CURRENCY_BACKEND.EUR,
				total_min_price: "2300.00",
				display_currencies: [ENUM_CURRENCY_BACKEND.EUR]
			})
		).toMatchObject({
			currency: ENUM_CURRENCY_OPTIONS.EUR,
			displayCurrencies: [ENUM_CURRENCY_OPTIONS.EUR]
		});
	});
});
