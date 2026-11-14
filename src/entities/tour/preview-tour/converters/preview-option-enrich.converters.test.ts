import { describe, expect, it } from "vitest";

import type { IOptionDetail, IPreviewOptionCard } from "../types";

import { enrichOptionDetailFromList } from "./preview-option.converters";

const detail = (title = ""): IOptionDetail => ({
	id: "opt-1",
	title,
	price: "$983.00",
	pricePerPerson: "",
	days: []
});

const card = (
	id: string,
	title: string,
	price: string
): IPreviewOptionCard => ({
	id,
	title,
	description: "",
	price,
	priceValue: null,
	totalPrice: "",
	image: ""
});

describe("enrichOptionDetailFromList", () => {
	it("takes title and per-person price of the option from the list", () => {
		expect(
			enrichOptionDetailFromList(
				detail(),
				[
					card("opt-0", "Comfort", "$700.00"),
					card("opt-1", "Standard", "$196.00")
				],
				"opt-1"
			)
		).toMatchObject({
			title: "Standard",
			price: "$983.00",
			pricePerPerson: "$196.00"
		});
	});

	it("keeps the detail title when it is already set", () => {
		expect(
			enrichOptionDetailFromList(
				detail("From detail"),
				[card("opt-1", "Standard", "$196.00")],
				"opt-1"
			).title
		).toBe("From detail");
	});

	it("returns the detail as is when the option is not in the list", () => {
		const source = detail();

		expect(enrichOptionDetailFromList(source, undefined, "opt-1")).toBe(
			source
		);
		expect(
			enrichOptionDetailFromList(
				source,
				[card("opt-2", "Lux", "$1,200.00")],
				"opt-1"
			)
		).toBe(source);
	});
});
