import { describe, expect, it } from "vitest";

import { ENUM_TRAIN_VARIANT_CHARGE } from "../../types";

import {
	mapTrainProductToCreate,
	mapTrainVariantToWrite
} from "./product.converters";

describe("mapTrainProductToCreate", () => {
	it("maps Afrosiyob hops as hop[]", () => {
		expect(
			mapTrainProductToCreate({
				name: "Afrosiyob TAS–SKD",
				hops: [
					{
						departure: {
							time: "08:00",
							location: { lat: 41.29, long: 69.28 }
						},
						arrival: {
							time: "10:10",
							location: { lat: 39.65, long: 66.97 }
						}
					}
				]
			})
		).toEqual({
			typ: "train",
			name: "Afrosiyob TAS–SKD",
			details: {
				typ: "train",
				hop: [
					{
						departure: {
							time: { time: "08:00" },
							location: { lat: 41.29, long: 69.28 }
						},
						arrival: {
							time: { time: "10:10" },
							location: { lat: 39.65, long: 66.97 }
						}
					}
				]
			}
		});
	});
});

describe("mapTrainVariantToWrite", () => {
	it("maps per_person expenses without rooms", () => {
		const body = mapTrainVariantToWrite({
			name: "Business",
			expenses: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 35, currency: "USD" },
				fees: null,
				markup: null
			}
		});

		expect(body).toEqual({
			typ: "train",
			name: "Business",
			details: {
				typ: "train",
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 35, currency: "USD" },
					fees: null,
					markup: null
				}
			}
		});
		expect(body.details).not.toHaveProperty("rooms");
	});
});
