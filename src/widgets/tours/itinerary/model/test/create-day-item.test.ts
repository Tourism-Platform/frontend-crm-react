import { describe, expect, it, vi } from "vitest";

import { ENUM_EVENT, type IEventLibraryItem } from "@/entities/tour";

import {
	createItemFromLibrarySummary,
	createItemFromTemplate
} from "../helpers/create-day-item";

vi.mock("@/entities/tour", () => {
	const ENUM_EVENT = {
		ACTIVITY: "activity",
		MULTIPLY_OPTION: "multiply-option"
	} as const;

	const stubIcon = () => null;

	return {
		ENUM_EVENT,
		EVENT_TEMPLATES_LIST: {
			library: [],
			components: [
				{
					eventType: ENUM_EVENT.ACTIVITY,
					title: "Activity",
					icon: stubIcon,
					color_text: "text-sky-500",
					color_bg: "bg-sky-500"
				},
				{
					eventType: ENUM_EVENT.MULTIPLY_OPTION,
					title: "Multiply option",
					icon: stubIcon,
					color_text: "text-gray-500",
					color_bg: "bg-gray-500"
				}
			]
		}
	};
});

describe("createItemFromTemplate", () => {
	it("generates unique block_id for rapid identical templates", () => {
		const ids = Array.from({ length: 20 }, () =>
			createItemFromTemplate(ENUM_EVENT.ACTIVITY, null)
		).map((item) => item!.block_id);

		expect(ids.every(Boolean)).toBe(true);
		expect(new Set(ids).size).toBe(20);
	});

	it("uses the same value for id and block_id", () => {
		const item = createItemFromTemplate(ENUM_EVENT.ACTIVITY, null);
		expect(item).not.toBeNull();
		expect(item!.id).toBe(item!.block_id);
	});

	it("rejects multiply-option inside nested container", () => {
		const item = createItemFromTemplate(ENUM_EVENT.MULTIPLY_OPTION, {
			location: "day",
			day: 1,
			nestedIndex: 0
		});
		expect(item).toBeNull();
	});
});

describe("createItemFromLibrarySummary", () => {
	const summary = (
		overrides?: Partial<IEventLibraryItem>
	): IEventLibraryItem =>
		({
			id: "tpl-1",
			name: "Library Activity",
			eventType: ENUM_EVENT.ACTIVITY,
			supplierId: null,
			summary: null,
			primaryImagePath: null,
			...overrides
		}) as IEventLibraryItem;

	it("generates different block_id for two drops of the same template", () => {
		const first = createItemFromLibrarySummary(summary(), null);
		const second = createItemFromLibrarySummary(summary(), null);

		expect(first).not.toBeNull();
		expect(second).not.toBeNull();
		expect(first!.block_id).not.toBe(second!.block_id);
		expect(first!.id).toBe(first!.block_id);
		expect(second!.id).toBe(second!.block_id);
	});
});
