import { describe, expect, it } from "vitest";

import { ENUM_TRAIN_PRICING, ENUM_TRAIN_VARIANT_CHARGE } from "../../types";

import {
	mapTrainProductToCreate,
	mapTrainVariantToWrite
} from "./product.converters";

describe("mapTrainProductToCreate", () => {
	it("maps Afrosiyob hops as legs[]", () => {
		expect(
			mapTrainProductToCreate({
				name: "Afrosiyob TAS–SKD",
				hops: [
					{
						departure: {
							location: { lat: 41.29, long: 69.28 }
						},
						arrival: {
							location: { lat: 39.65, long: 66.97 }
						}
					}
				]
			})
		).toEqual({
			typ: "train",
			details: {
				pricing: "per_fare",
				name: "Afrosiyob TAS–SKD",
				legs: [
					{
						departure: {
							location: { lat: 41.29, long: 69.28 }
						},
						arrival: {
							location: { lat: 39.65, long: 66.97 }
						}
					}
				]
			}
		});
	});
});

describe("mapTrainVariantToWrite", () => {
	it("maps per_fare variant with per_person charge", () => {
		const body = mapTrainVariantToWrite(
			{
				name: "Business",
				expenses: {
					typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
					costPerPerson: { val: 35, currency: "USD" },
					fees: null,
					markup: null
				}
			},
			ENUM_TRAIN_PRICING.PER_FARE
		);

		expect(body).toEqual({
			typ: "train",
			pricing: "per_fare",
			name: "Business",
			charge: {
				typ: "per_person",
				cost_per_person: { val: 35, currency: "USD" },
				fees: null,
				markup: null
			}
		});
	});

	it("maps whole variant without charge", () => {
		const body = mapTrainVariantToWrite(
			{
				name: "Business",
				expenses: {
					typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
					cost: { val: 35, currency: "USD" },
					fees: null,
					markup: null
				}
			},
			ENUM_TRAIN_PRICING.WHOLE
		);

		expect(body).toEqual({
			typ: "train",
			pricing: "whole",
			name: "Business"
		});
	});
});
