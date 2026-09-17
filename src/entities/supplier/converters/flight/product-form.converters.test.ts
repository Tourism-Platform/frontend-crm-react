import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES } from "@/shared/config";

import {
	emptyHopFormRow,
	mapFlightProductGeneralToCreate,
	mapFlightProductToGeneralForm
} from "./product-form.converters";

const formValues = {
	name: "HY TAS–SKD",
	hops: [
		{
			airline_code: "HY",
			flight_number: "601",
			departure_airport_code: "TAS",
			arrival_airport_code: "SKD",
			departure_location: {
				lat: 41.25,
				long: 69.28,
				city: "Tashkent",
				street: "Airport",
				label: "Airport, Tashkent"
			},
			arrival_location: {
				lat: 39.7,
				long: 66.98,
				city: "Samarkand",
				street: "Airport",
				label: "Airport, Samarkand"
			},
			departure_terminal: "2",
			departure_gate: "A1"
		}
	]
};

describe("mapFlightProductGeneralToCreate", () => {
	it("maps geo location with city on create", () => {
		const body = mapFlightProductGeneralToCreate(
			formValues,
			ENUM_LANGUAGES.EN
		);

		expect(body.details.pricing).toBe("per_fare");
		expect(body.details.name).toBe("HY TAS–SKD");
		expect(body.details.legs?.[0]).toMatchObject({
			airline_code: "HY",
			flight_number: 601,
			departure_airport_code: "TAS",
			arrival_airport_code: "SKD",
			departure_terminal: "2",
			departure_gate: "A1",
			departure_location: {
				lat: 41.25,
				long: 69.28,
				city: "Tashkent",
				lang: LanguageCode.En
			}
		});
	});

	it("returns null location when geo is empty", () => {
		const body = mapFlightProductGeneralToCreate(
			{
				...formValues,
				hops: [
					{
						...formValues.hops[0],
						departure_location: null,
						arrival_location: null
					}
				]
			},
			ENUM_LANGUAGES.EN
		);

		expect(body.details.legs?.[0]?.departure_location).toBeNull();
		expect(body.details.legs?.[0]?.arrival_location).toBeNull();
	});
});

describe("mapFlightProductToGeneralForm", () => {
	it("maps product to empty form when product is missing", () => {
		expect(mapFlightProductToGeneralForm(null)).toEqual({
			name: "",
			hops: [emptyHopFormRow()]
		});
	});
});
