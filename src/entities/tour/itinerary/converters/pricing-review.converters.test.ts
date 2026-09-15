import { describe, expect, it } from "vitest";

import { BreakdownLineKind, ExpenseType, PricingWarning } from "@/shared/api";

import {
	ENUM_BREAKDOWN_LEG,
	ENUM_BREAKDOWN_LINE_KIND,
	ENUM_BREAKDOWN_PRICING,
	ENUM_PRICING_REVIEW_ROW,
	ENUM_PRICING_WARNING
} from "../../tour/types";
import { TOUR_SUMMARY_MOCK } from "../mock/tour-summary.mock";
import { ENUM_EVENT } from "../types";

import {
	mapBreakdownLineToFrontend,
	mapPricingWarningsToFrontend
} from "./pricing-breakdown.converters";
import { mapPricingBreakdownToFrontend } from "./pricing-review.converters";

describe("mapBreakdownLineToFrontend", () => {
	it("maps wire fields to camelCase and keeps the cost identity", () => {
		expect(
			mapBreakdownLineToFrontend({
				kind: BreakdownLineKind.Unit,
				label: "Standard / double",
				unit_id: "room_1",
				pricing: ExpenseType.PerDuration,
				rate: ExpenseType.Fixed,
				unit_cost: { val: 200 },
				quantity: 2,
				pax: null,
				duration: 2,
				fx_rate: null,
				cost: { val: 800 },
				fee: { val: 0 },
				markup: { val: 80 }
			})
		).toEqual({
			kind: ENUM_BREAKDOWN_LINE_KIND.UNIT,
			label: "Standard / double",
			unitId: "room_1",
			pricing: ENUM_BREAKDOWN_PRICING.PER_DURATION,
			rate: ENUM_BREAKDOWN_PRICING.FIXED,
			unitCost: { val: 200 },
			quantity: 2,
			pax: null,
			duration: 2,
			fxRate: null,
			cost: { val: 800 },
			fee: { val: 0 },
			markup: { val: 80 }
		});
	});

	it("matches cost = unit_cost × quantity × (pax|1) × (duration|1) × (fx_rate|1)", () => {
		const line = mapBreakdownLineToFrontend({
			kind: BreakdownLineKind.ExtraCost,
			label: "Breakfast",
			unit_id: null,
			pricing: ExpenseType.PerPerson,
			rate: null,
			unit_cost: { val: 10 },
			quantity: 2,
			pax: 13,
			duration: null,
			fx_rate: "1.1",
			cost: { val: 286 },
			fee: { val: 0 },
			markup: { val: 0 }
		});

		const fxRate = Number(line.fxRate ?? 1);
		expect(
			line.unitCost.val *
				line.quantity *
				(line.pax ?? 1) *
				(line.duration ?? 1) *
				fxRate
		).toBeCloseTo(line.cost.val);
	});
});

describe("mapPricingWarningsToFrontend", () => {
	it("maps generated warning codes", () => {
		expect(
			mapPricingWarningsToFrontend([
				PricingWarning.FixedChargeOnSightseeing,
				PricingWarning.EmptySupply
			])
		).toEqual([
			ENUM_PRICING_WARNING.FIXED_CHARGE_ON_SIGHTSEEING,
			ENUM_PRICING_WARNING.EMPTY_SUPPLY
		]);
	});
});

describe("mapPricingBreakdownToFrontend", () => {
	const mapped = mapPricingBreakdownToFrontend(TOUR_SUMMARY_MOCK);

	it("maps group totals separately from per-person revenue and pax legs", () => {
		expect(mapped.summary.pax).toEqual({ from: 1, to: 13 });
		expect(mapped.summary.revenue).toEqual({ from: 2710, to: 3570 });
		expect(mapped.summary.revenuePerPerson).toEqual({
			from: 274.62,
			to: 2710
		});
		expect(mapped.summary.cost).toEqual({ from: 2450, to: 3200 });
		expect(mapped.summary.profit).toEqual({ from: 260, to: 370 });
	});

	it("discriminates individual_bill and package_bill rows", () => {
		expect(mapped.items.map((item) => item.type)).toEqual([
			ENUM_EVENT.FLIGHT,
			ENUM_EVENT.MULTIPLY_OPTION,
			ENUM_EVENT.ACTIVITY,
			ENUM_EVENT.PACKAGE
		]);
	});

	it("keeps options-event warnings empty and flags sightseeing", () => {
		const optionsEvent = mapped.items[1];
		const sightseeing = mapped.items[2];

		expect(optionsEvent.warnings).toEqual([]);
		expect(sightseeing.warnings).toEqual([
			ENUM_PRICING_WARNING.FIXED_CHARGE_ON_SIGHTSEEING
		]);
	});

	it("prepends min/max breakdown groups and sums line cost to the event cost", () => {
		const flight = mapped.items[0];
		const minGroup = flight.subRows?.[0];
		const maxGroup = flight.subRows?.[1];

		expect(minGroup?.rowKind).toBe(ENUM_PRICING_REVIEW_ROW.BREAKDOWN_GROUP);
		expect(minGroup?.breakdownLeg).toBe(ENUM_BREAKDOWN_LEG.MIN);
		expect(maxGroup?.breakdownLeg).toBe(ENUM_BREAKDOWN_LEG.MAX);

		expect(
			flight.breakdown?.min.reduce((sum, line) => sum + line.cost.val, 0)
		).toBe(1000);
		expect(
			flight.breakdown?.max.reduce((sum, line) => sum + line.cost.val, 0)
		).toBe(1200);
	});

	it("maps a package as a single breakdown line named after the package", () => {
		const pkg = mapped.items[3];
		expect(pkg.breakdown?.min).toEqual([
			expect.objectContaining({
				label: "City Transfer Package",
				unitId: "package_1",
				cost: { val: 400 }
			})
		]);
	});
});
