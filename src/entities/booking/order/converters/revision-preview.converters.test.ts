import { describe, expect, it } from "vitest";

import { BreakdownLineKind, ExpenseType, PricingWarning } from "@/shared/api";

import {
	ENUM_BREAKDOWN_LINE_KIND,
	ENUM_PRICING_WARNING
} from "@/entities/tour/tour/types/pricing-breakdown.types";

import type { TRevisionPreviewBackend } from "../types/revision-event-product.types";

import { mapRevisionPreviewBreakdownToFrontend } from "./revision-preview.converters";

describe("mapRevisionPreviewBreakdownToFrontend", () => {
	it("maps event_id, lines and warnings in itinerary order", () => {
		const backend = {
			breakdown: [
				{
					event_id: "event_1",
					lines: [
						{
							kind: BreakdownLineKind.Unit,
							label: "Economy",
							unit_id: "fare_1",
							supply_id: null,
							pricing: ExpenseType.Fixed,
							rate: null,
							unit_cost: { val: 100 },
							quantity: 1,
							pax: null,
							duration: null,
							fx_rate: null,
							cost: { val: 100 },
							fee: { val: 0 },
							markup: { val: 10 }
						}
					],
					warnings: [PricingWarning.ZeroCost]
				}
			]
		} as TRevisionPreviewBackend;

		expect(mapRevisionPreviewBreakdownToFrontend(backend)).toEqual([
			{
				eventId: "event_1",
				lines: [
					expect.objectContaining({
						kind: ENUM_BREAKDOWN_LINE_KIND.UNIT,
						label: "Economy",
						unitId: "fare_1",
						cost: { val: 100 }
					})
				],
				warnings: [ENUM_PRICING_WARNING.ZERO_COST]
			}
		]);
	});

	it("keeps an empty list when the price does not resolve", () => {
		const backend = { breakdown: [] } as unknown as TRevisionPreviewBackend;

		expect(mapRevisionPreviewBreakdownToFrontend(backend)).toEqual([]);
	});
});
