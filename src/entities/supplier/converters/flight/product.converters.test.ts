import { describe, expect, it } from "vitest";

import { ENUM_SUPPLIER_VARIANT_CHARGE } from "../../types";

import {
	mapFlightProductToCreate,
	mapFlightVariantToWrite
} from "./product.converters";

describe("mapFlightProductToCreate", () => {
	it("maps hops as hop[]", () => {
		expect(
			mapFlightProductToCreate({
				name: "HY TAS–SKD",
				hops: [
					{
						airlineCode: "HY",
						flightNumber: 601,
						departureAirportCode: "TAS",
						arrivalAirportCode: "SKD",
						departureLocation: { lat: 41.25, long: 69.28 },
						arrivalLocation: { lat: 39.7, long: 66.98 },
						departureTerminal: "2",
						departureGate: "A1",
						amenities: []
					}
				]
			})
		).toEqual({
			typ: "flight",
			name: "HY TAS–SKD",
			details: {
				typ: "flight",
				hop: [
					{
						airline_code: "HY",
						flight_number: 601,
						departure_airport_code: "TAS",
						arrival_airport_code: "SKD",
						departure_location: { lat: 41.25, long: 69.28 },
						arrival_location: { lat: 39.7, long: 66.98 },
						departure_terminal: "2",
						departure_gate: "A1",
						amenities: null
					}
				]
			}
		});
	});
});

describe("mapFlightVariantToWrite", () => {
	it("maps per_person expenses", () => {
		expect(
			mapFlightVariantToWrite({
				name: "Economy",
				expenses: {
					typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
					costPerPerson: { val: 120, currency: "USD" },
					fees: null,
					markup: null
				}
			})
		).toEqual({
			typ: "flight",
			name: "Economy",
			details: {
				typ: "flight",
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 120, currency: "USD" },
					fees: null,
					markup: null
				}
			}
		});
	});
});
