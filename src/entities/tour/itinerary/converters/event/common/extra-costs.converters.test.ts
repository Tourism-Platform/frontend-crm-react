import { describe, expect, it, vi } from "vitest";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import {
	ENUM_EXTRA_COST_FIELD,
	ENUM_EXTRA_COST_MODE,
	type TExtraCostInputBackend
} from "../../../types";

import {
	mapExtraCostsFromBackend,
	mapExtraCostsToBackend
} from "./extra-costs.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

const usd = (val: number) => ({ val, currency: ENUM_CURRENCY_BACKEND.USD });

const lines: TExtraCostInputBackend[] = [
	{ name: "Transfer", expense: { typ: "fixed", cost: usd(30) } },
	{
		name: "Meals",
		expense: { typ: "per_duration", rate: { typ: "fixed", cost: usd(25) } }
	},
	{
		name: "Tickets",
		expense: { typ: "per_person", cost_per_person: usd(5) }
	},
	{
		name: "Water",
		expense: {
			typ: "per_duration",
			rate: { typ: "per_person", cost_per_person: usd(1) }
		}
	}
];

describe("extra costs converters", () => {
	it("reads every editable shape into its mode", () => {
		expect(
			mapExtraCostsFromBackend(lines).map((row) => [
				row[ENUM_EXTRA_COST_FIELD.MODE],
				row[ENUM_EXTRA_COST_FIELD.COST],
				row[ENUM_EXTRA_COST_FIELD.CURRENCY]
			])
		).toEqual([
			[ENUM_EXTRA_COST_MODE.TRIP, 30, "USD"],
			[ENUM_EXTRA_COST_MODE.PER_DAY, 25, "USD"],
			[ENUM_EXTRA_COST_MODE.PER_PERSON, 5, "USD"],
			[ENUM_EXTRA_COST_MODE.PER_PERSON_DAY, 1, "USD"]
		]);
	});

	it("round-trips every line without loss", () => {
		expect(mapExtraCostsToBackend(mapExtraCostsFromBackend(lines))).toEqual(
			lines
		);
	});

	it("keeps per-day group-size tiers it cannot edit as read", () => {
		const tiered: TExtraCostInputBackend = {
			name: "Bus",
			expense: {
				typ: "per_duration",
				rate: {
					typ: "per_group",
					tiers: [{ up_to_pax: 10, cost: usd(100) }]
				}
			}
		};

		const [row] = mapExtraCostsFromBackend([tiered]);

		expect(row[ENUM_EXTRA_COST_FIELD.RAW]).toBe(tiered);
		expect(mapExtraCostsToBackend([row])).toEqual([tiered]);
	});
});
