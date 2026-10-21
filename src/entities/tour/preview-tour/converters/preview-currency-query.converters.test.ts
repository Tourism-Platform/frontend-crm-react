import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";

import {
	mapPreviewCurrencyQueryToBackend,
	mapPreviewOptionsQueryToBackend
} from "./preview-option.converters";

describe("preview currency query", () => {
	it("sends no currency when it is empty", () => {
		expect(mapPreviewCurrencyQueryToBackend()).toEqual({});
	});

	it("maps currency to backend", () => {
		expect(mapPreviewCurrencyQueryToBackend("EUR")).toEqual({
			currency: Currency.EUR
		});
	});

	it("adds currency to options list query", () => {
		expect(
			mapPreviewOptionsQueryToBackend({
				page: 1,
				limit: 10,
				tourId: "tour",
				currency: "UZS"
			})
		).toEqual({ limit: 10, currency: Currency.UZS });
	});
});
