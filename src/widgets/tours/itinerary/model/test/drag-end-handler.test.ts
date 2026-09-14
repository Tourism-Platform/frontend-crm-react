import type { DragEndEvent } from "@dnd-kit/core";
import { describe, expect, it } from "vitest";

import { ENUM_EVENT } from "@/entities/tour";

import { handleDragEnd } from "../handlers/drag-end-handler";
import { itemId } from "../helpers/id-convention";
import type { IDayItem } from "../types";
import type { TOptionsData } from "../types";

const ACTIVE_OPTION = "option-1";

const nestedRow = (id: string, backendId?: string): IDayItem => ({
	id,
	block_id: id,
	eventType: ENUM_EVENT.ACTIVITY,
	title: id,
	...(backendId ? { backendId } : {})
});

const buildOptionsData = (items: IDayItem[]): TOptionsData => ({
	[ACTIVE_OPTION]: {
		tripDetails: [],
		days: {
			1: [
				{
					id: "multi-1",
					block_id: "multi-1",
					eventType: ENUM_EVENT.MULTIPLY_OPTION,
					title: "Multi",
					backendId: "parent-backend-1",
					items
				}
			]
		},
		dayOrder: [1]
	}
});

const dragEvent = (activeId: string, overId: string): DragEndEvent =>
	({
		active: { id: activeId },
		over: { id: overId }
	}) as DragEndEvent;

describe("handleDragEnd → reorderOptions", () => {
	it("builds the order from event option IDs (string[]), not indices", () => {
		const optionsData = buildOptionsData([
			nestedRow("row-a", "opt-uuid-a"),
			nestedRow("row-b", "opt-uuid-b"),
			nestedRow("row-c", "opt-uuid-c")
		]);

		const result = handleDragEnd(
			dragEvent(itemId("row-a"), itemId("row-c")),
			optionsData,
			ACTIVE_OPTION
		);

		expect(result.action).toEqual({
			type: "reorderOptions",
			parentBackendId: "parent-backend-1",
			order: ["opt-uuid-b", "opt-uuid-c", "opt-uuid-a"]
		});
	});

	it("does not produce an action when any nested row is not synced (no backendId)", () => {
		const optionsData = buildOptionsData([
			nestedRow("row-a", "opt-uuid-a"),
			nestedRow("row-b"),
			nestedRow("row-c", "opt-uuid-c")
		]);

		const result = handleDragEnd(
			dragEvent(itemId("row-a"), itemId("row-c")),
			optionsData,
			ACTIVE_OPTION
		);

		expect(result.action).toBeUndefined();
	});
});
