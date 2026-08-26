import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES } from "@/shared/config";

import { ENUM_HOTEL_AMENITY } from "../../types";

import {
	mapGeneralFormToDetailsBackend,
	mapHotelProductGeneralToCreate,
	mapHotelProductToGeneralForm
} from "./product-form.converters";

const formValues = {
	name: "Hyatt Regency Tashkent",
	location: {
		lat: 41.311,
		long: 69.279,
		city: "Tashkent",
		street: "Amir Temur",
		label: "Amir Temur, Tashkent"
	},
	stars: 5,
	amenities: [ENUM_HOTEL_AMENITY.WIFI, ENUM_HOTEL_AMENITY.POOL],
	checkInFrom: "14:00",
	checkOutUntil: "12:00"
};

describe("mapHotelProductGeneralToCreate", () => {
	it("maps geo location with city on create", () => {
		const body = mapHotelProductGeneralToCreate(
			formValues,
			ENUM_LANGUAGES.EN
		);

		expect(body.details?.location).toMatchObject({
			lat: 41.311,
			long: 69.279,
			city: "Tashkent",
			lang: LanguageCode.En
		});
		expect(body.name).toBe("Hyatt Regency Tashkent");
		expect(body.details?.stars).toBe(5);
	});
});

describe("mapGeneralFormToDetailsBackend", () => {
	it("returns null location when geo is empty", () => {
		const body = mapGeneralFormToDetailsBackend(
			{ ...formValues, location: null },
			null,
			LanguageCode.En
		);

		expect(body.location).toBeNull();
	});
});

describe("mapHotelProductToGeneralForm", () => {
	it("maps product to empty form when product is missing", () => {
		expect(mapHotelProductToGeneralForm(null)).toEqual({
			name: "",
			location: null,
			stars: null,
			amenities: [],
			checkInFrom: "",
			checkOutUntil: ""
		});
	});
});
