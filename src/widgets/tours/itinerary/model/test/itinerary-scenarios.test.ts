import { describe, expect, it } from "vitest";

import {
	addItemToData,
	moveItemInData,
	removeItemFromData,
	reorderDaysInData
} from "../helpers";
import { ENUM_EVENT, type IDayItem } from "../types";

describe("Itinerary DnD Scenarios", () => {
	const initialData = {
		1: {
			tripDetails: [
				{
					id: "t1",
					block_id: "trip-item-1",
					event_type: ENUM_EVENT.INFO,
					title: "Trip Info"
				}
			],
			days: {
				1: [
					{
						id: "d1-1",
						block_id: "day-1-item-1",
						event_type: ENUM_EVENT.ACTIVITY,
						title: "Day 1 Activity"
					},
					{
						id: "group-1",
						block_id: "group-1",
						event_type: ENUM_EVENT.MULTIPLY_OPTION,
						title: "Group 1",
						items: [
							{
								id: "nested-1",
								block_id: "nested-1",
								event_type: ENUM_EVENT.FLIGHT,
								title: "Nested Flight"
							}
						]
					}
				],
				2: []
			},
			dayOrder: [1, 2]
		}
	};

	describe("1. Adding new elements (addItemToData)", () => {
		it("should add new item to an empty day", () => {
			const newItem = {
				id: "new",
				block_id: "new-block",
				event_type: ENUM_EVENT.TOUR_DETAILS,
				title: "New"
			};
			const result = addItemToData(
				initialData,
				{ location: "day", day: 2 },
				0,
				newItem,
				1
			);
			expect(result[1]?.days[2]).toHaveLength(1);
			expect(result[1]?.days[2]?.[0]?.block_id).toBe("new-block");
		});

		it("should add new item directly into a group", () => {
			const newItem = {
				id: "new",
				block_id: "new-nested",
				event_type: ENUM_EVENT.ACTIVITY,
				title: "New Nested"
			};
			// group-1 is at index 1 in Day 1
			const result = addItemToData(
				initialData,
				{ location: "day", day: 1, nestedIndex: 1 },
				1,
				newItem,
				1
			);
			expect(result[1]?.days[1]?.[1]?.items).toHaveLength(2);
			expect(result[1]?.days[1]?.[1]?.items?.[1]?.block_id).toBe(
				"new-nested"
			);
		});
	});

	describe("2. Reordering (moveItemInData)", () => {
		it("should reorder items within the same day", () => {
			// Move item 0 after item 1 (to position 2, which becomes 1 after removal)
			const item0 = initialData[1].days[1][0];
			const result = moveItemInData(
				initialData,
				{ optionId: 1, location: "day", day: 1, index: 0 },
				{ location: "day", day: 1 },
				2, // Insert at position 2 (after group-1)
				item0,
				1
			);
			expect(result[1]?.days[1]?.[0]?.block_id).toBe("group-1");
			expect(result[1]?.days[1]?.[1]?.block_id).toBe("day-1-item-1");
		});

		it("should move item between different days", () => {
			const item0 = initialData[1].days[1][0];
			const result = moveItemInData(
				initialData,
				{ optionId: 1, location: "day", day: 1, index: 0 },
				{ location: "day", day: 2 },
				0,
				item0,
				1
			);
			expect(result[1]?.days[1]).toHaveLength(1);
			expect(result[1]?.days[2]).toHaveLength(1);
			expect(result[1]?.days[2]?.[0]?.block_id).toBe("day-1-item-1");
		});
	});

	describe("3. Grouping and Ungrouping (moveItemInData)", () => {
		it("should pack a top-level item into a group", () => {
			const item0 = initialData[1].days[1][0];
			const result = moveItemInData(
				initialData,
				{ optionId: 1, location: "day", day: 1, index: 0 },
				{ location: "day", day: 1, nestedIndex: 1 }, // into group-1 (index 1)
				1,
				item0,
				1
			);
			expect(result[1]?.days[1]).toHaveLength(1); // only group remains
			expect(result[1]?.days[1]?.[0]?.items).toHaveLength(2);
			expect(result[1]?.days[1]?.[0]?.items?.[1]?.block_id).toBe(
				"day-1-item-1"
			);
		});

		it("should extract a nested item to the top level", () => {
			const nestedItem = initialData?.[1]?.days?.[1]?.[1]
				?.items?.[0] as IDayItem;
			const result = moveItemInData(
				initialData,
				{
					optionId: 1,
					location: "day",
					day: 1,
					index: 1,
					nestedIndex: 0
				},
				{ location: "day", day: 1 },
				0,
				nestedItem,
				1
			);
			// After extraction, array is: [nested-1, day-1-item-1, group-1]
			expect(result[1]?.days[1]).toHaveLength(3);
			expect(result[1]?.days[1]?.[0]?.block_id).toBe("nested-1");
			expect(result[1]?.days[1]?.[2]?.items).toHaveLength(0); // group is now at index 2
		});
	});

	describe("4. Structural changes", () => {
		it("should reorder days", () => {
			const result = reorderDaysInData(initialData, 1, 1, 2);
			expect(result[1]?.dayOrder).toEqual([2, 1]);
		});

		it("should move item from Trip Details to Day", () => {
			const tripItem = initialData[1].tripDetails[0];
			const result = moveItemInData(
				initialData,
				{ optionId: 1, location: "tripDetails", index: 0 },
				{ location: "day", day: 1 },
				0,
				tripItem,
				1
			);
			expect(result[1]?.tripDetails).toHaveLength(0);
			expect(result[1]?.days[1]?.[0]?.block_id).toBe("trip-item-1");
		});
	});

	describe("5. Deletion (removeItemFromData)", () => {
		it("should remove a top-level item", () => {
			const result = removeItemFromData(initialData, {
				optionId: 1,
				location: "day",
				day: 1,
				index: 0
			});
			expect(result[1]?.days[1]).toHaveLength(1);
			expect(result[1]?.days[1]?.[0]?.block_id).toBe("group-1");
		});

		it("should remove a nested item", () => {
			const result = removeItemFromData(initialData, {
				optionId: 1,
				location: "day",
				day: 1,
				index: 1,
				nestedIndex: 0
			});
			expect(result[1]?.days[1]?.[1]?.items).toHaveLength(0);
		});
	});
});
