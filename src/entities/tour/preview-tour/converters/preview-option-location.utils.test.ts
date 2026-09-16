import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api";

import { extractCityFromPubEvent } from "./preview-option-location.utils";

describe("extractCityFromPubEvent — hops", () => {
	it("finds city on the second flight hop", () => {
		const city = extractCityFromPubEvent({
			typ: "flight",
			name: "TAS — SKD",
			description: null,
			day: 1,
			position: 0,
			is_optional: false,
			images: [],
			date: null,
			details: {
				spec: {
					hop: [
						{
							airline_code: "HY",
							flight_number: 1,
							departure_airport_code: "TAS",
							arrival_airport_code: "SKD",
							departure_location: null,
							arrival_location: null,
							departure_date: null,
							arrival_date: null,
							departure_time: null,
							arrival_time: null,
							departure_terminal: null,
							departure_gate: null,
							amenities: []
						},
						{
							airline_code: "HY",
							flight_number: 2,
							departure_airport_code: "SKD",
							arrival_airport_code: "BHK",
							departure_location: {
								city: "Samarkand",
								address: null,
								lat: 0,
								long: 0,
								lang: LanguageCode.En
							},
							arrival_location: null,
							departure_date: null,
							arrival_date: null,
							departure_time: null,
							arrival_time: null,
							departure_terminal: null,
							departure_gate: null,
							amenities: []
						}
					]
				}
			}
		});

		expect(city).toBe("Samarkand");
	});

	it("does not throw when spec exists without hop", () => {
		const city = extractCityFromPubEvent({
			typ: "flight",
			name: "TAS — SKD",
			description: null,
			day: 1,
			position: 0,
			is_optional: false,
			images: [],
			date: null,
			details: {
				// Runtime may omit hop; generated type requires it.
				spec: {} as { hop: never[] }
			}
		});

		expect(city).toBeUndefined();
	});
});
