import { describe, expect, it, vi } from "vitest";

import { ENUM_LANGUAGES } from "@/shared/config";

import {
	ENUM_ACTIVITY_FORM_SECTION,
	ENUM_ACTIVITY_PRICING_INVOICING,
	ENUM_ACTIVITY_PRICING_TYPE,
	ENUM_ACTIVITY_TYPE,
	ENUM_FORM_ACTIVITY,
	ENUM_FORM_ACTIVITY_MENU
} from "../../types";

import { mapActivityFormToUpdate } from "./activity.converters";

vi.mock("@/shared/config", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/shared/config")>();
	return {
		...actual,
		i18nKey: () => (key: string) => key
	};
});

vi.mock("@/entities/commission", () => ({
	DEFAULT_EVENT_CURRENCY: "USD",
	currencyConverter: {
		from: (value?: string) => value ?? "USD",
		to: (value?: string) => value
	},
	ENUM_CURRENCY_OPTIONS: { USD: "USD", EUR: "EUR" }
}));

const inlineSpec = (
	details: ReturnType<typeof mapActivityFormToUpdate>["details"]
) => {
	const supply = details?.pool?.[0]?.supply;
	return supply?.source === "inline" ? supply.spec : undefined;
};

describe("mapActivityFormToUpdate food branch", () => {
	it("sends sub_typ food and echoes menu id on the inline offering", () => {
		const result = mapActivityFormToUpdate(
			{
				[ENUM_ACTIVITY_FORM_SECTION.GENERAL]: {
					[ENUM_FORM_ACTIVITY.ACTIVITY_SUBTYPE]:
						ENUM_ACTIVITY_TYPE.FOOD,
					[ENUM_FORM_ACTIVITY.MENU]: [
						{
							[ENUM_FORM_ACTIVITY_MENU.ID]:
								"11111111-1111-1111-1111-111111111111",
							[ENUM_FORM_ACTIVITY_MENU.NAME]: "Plov",
							[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: "lamb"
						}
					]
				},
				[ENUM_ACTIVITY_FORM_SECTION.PRICING]: {
					invoicing: ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
					pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
					add_margin_separately: false,
					markup: null,
					package_id: "",
					total_price: 40,
					fees: [],
					currency: "USD"
				}
			},
			ENUM_LANGUAGES.EN
		);

		expect(inlineSpec(result.details)).toMatchObject({
			sub_typ: "food",
			offerings: [
				{
					menu: [
						{
							id: "11111111-1111-1111-1111-111111111111",
							name: "Plov",
							description: "lamb"
						}
					],
					charge: {
						typ: "fixed",
						cost: { val: 40, currency: "USD" }
					}
				}
			]
		});
	});

	it("does not send a food menu for a non-food subtype", () => {
		const result = mapActivityFormToUpdate(
			{
				[ENUM_ACTIVITY_FORM_SECTION.GENERAL]: {
					[ENUM_FORM_ACTIVITY.ACTIVITY_SUBTYPE]:
						ENUM_ACTIVITY_TYPE.SIGHTSEEING,
					[ENUM_FORM_ACTIVITY.MENU]: [
						{
							[ENUM_FORM_ACTIVITY_MENU.NAME]: "Should not send"
						}
					]
				}
			},
			ENUM_LANGUAGES.EN
		);

		expect(inlineSpec(result.details)).toMatchObject({
			sub_typ: "sightseeing"
		});
		expect(JSON.stringify(inlineSpec(result.details))).not.toContain(
			"Should not send"
		);
	});
});
