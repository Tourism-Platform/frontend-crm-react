import { describe, expect, it } from "vitest";

import { moveItemInData } from "../helpers";
import { ENUM_EVENT } from "../types";
import type { TOptionsData } from "../types";

describe("moveItemInData", () => {
	const initialData: TOptionsData = {
		1: {
			tripDetails: [
				{
					id: "p1",
					block_id: "parent-1",
					event_type: ENUM_EVENT.MULTIPLY_OPTION,
					title: "Group",
					items: [
						{
							id: "n1",
							block_id: "nested-1",
							event_type: ENUM_EVENT.FLIGHT,
							title: "Nested Flight"
						}
					]
				}
			],
			days: {
				1: [
					{
						id: "d1",
						block_id: "day-item-1",
						event_type: ENUM_EVENT.ACTIVITY,
						title: "Day Activity"
					}
				]
			},
			dayOrder: [1]
		}
	};

	it("should move item out of nested container to the top level of the same day/trip", () => {
		const nestedItem = initialData[1]?.tripDetails?.[0]?.items?.[0];
		if (!nestedItem) throw new Error("Test data is invalid");

		const result = moveItemInData(
			initialData,
			{ optionId: 1, location: "tripDetails", index: 0, nestedIndex: 0 },
			{ location: "tripDetails" },
			1,
			nestedItem,
			1
		);

		// Parent should be empty
		expect(result[1]?.tripDetails?.[0]?.items).toHaveLength(0);
		// Item should be at the second position of tripDetails
		expect(result[1]?.tripDetails?.[1]?.block_id).toBe("nested-1");
	});

	it("should move top-level day item into a nested container in the same day", () => {
		// Prepare data with a multiplier in Day 1
		const dayData: TOptionsData = {
			...initialData,
			1: {
				...initialData[1]!,
				days: {
					1: [
						{
							id: "d1",
							block_id: "day-item-1",
							event_type: ENUM_EVENT.ACTIVITY,
							title: "Day Activity"
						},
						{
							id: "group-day",
							block_id: "group-day-1",
							event_type: ENUM_EVENT.MULTIPLY_OPTION,
							title: "Day Group",
							items: []
						}
					]
				}
			}
		};

		const dayItem = dayData[1]?.days?.[1]?.[0];
		if (!dayItem) throw new Error("Test data is invalid");

		const result = moveItemInData(
			dayData,
			{ optionId: 1, location: "day", day: 1, index: 0 }, // day-item-1
			{ location: "day", day: 1, nestedIndex: 1 }, // into group-day-1
			0,
			dayItem,
			1
		);

		// day-item-1 should be removed from top level
		expect(result[1]?.days?.[1]).toHaveLength(1);
		expect(result[1]?.days?.[1]?.[0]?.block_id).toBe("group-day-1");
		// and added to nested items
		expect(result[1]?.days?.[1]?.[0]?.items).toHaveLength(1);
		expect(result[1]?.days?.[1]?.[0]?.items?.[0]?.block_id).toBe(
			"day-item-1"
		);
	});
});
