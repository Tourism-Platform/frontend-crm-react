import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES } from "@/shared/config";

import {
	emptyHopFormRow,
	mapTrainProductGeneralToCreate,
	mapTrainProductToGeneralForm
} from "./product-form.converters";

const formValues = {
	name: "Afrosiyob TAS–SKD",
	hops: [
		{
			departureTime: "08:00",
			arrivalTime: "10:10",
			departureLocation: {
				lat: 41.29,
				long: 69.28,
				city: "Tashkent",
				street: "Station",
				label: "Station, Tashkent"
			},
			arrivalLocation: {
				lat: 39.65,
				long: 66.97,
				city: "Samarkand",
				street: "Station",
				label: "Station, Samarkand"
			}
		}
	]
};

describe("mapTrainProductGeneralToCreate", () => {
	it("maps geo location with city on create", () => {
		const body = mapTrainProductGeneralToCreate(
			formValues,
			ENUM_LANGUAGES.EN
		);

		expect(body.name).toBe("Afrosiyob TAS–SKD");
		expect(body.details?.hop?.[0]?.departure?.location).toMatchObject({
			lat: 41.29,
			long: 69.28,
			city: "Tashkent",
			lang: LanguageCode.En
		});
	});

	it("returns null location when geo is empty", () => {
		const body = mapTrainProductGeneralToCreate(
			{
				...formValues,
				hops: [
					{
						departureTime: "08:00",
						arrivalTime: "10:10",
						departureLocation: null,
						arrivalLocation: null
					}
				]
			},
			ENUM_LANGUAGES.EN
		);

		expect(body.details?.hop?.[0]?.departure?.location).toBeNull();
		expect(body.details?.hop?.[0]?.arrival?.location).toBeNull();
	});
});

describe("mapTrainProductToGeneralForm", () => {
	it("maps product to empty form when product is missing", () => {
		expect(mapTrainProductToGeneralForm(null)).toEqual({
			name: "",
			hops: [emptyHopFormRow()]
		});
	});
});
