import { describe, expect, it } from "vitest";

import type { InformationDetailsOutput } from "@/shared/api";

import type { TMultiEventDetailBackend } from "../../types";
import { ENUM_EVENT_BACKEND } from "../../types/event-backend-enum.types";
import { ENUM_EVENT } from "../../types/event-enum.types";

import {
	getRemovedMultiplyOptions,
	hasMultiplyOptionsOrderChanged,
	mapMultiplyOptionDetailToOption,
	mapMultiplyOptionReorderToBackend
} from "./multiply-option.converters";

const INFO_DETAILS: InformationDetailsOutput = {
	plan: {},
	pool: [
		{
			id: "11111111-1111-1111-1111-111111111111",
			is_main: true,
			supply: { source: "inline", supplier_id: null },
			spec: {}
		}
	]
};

const buildDetail = (
	overrides: Partial<{
		id: string;
		name: string | null;
		description: string | null;
	}>
): TMultiEventDetailBackend => ({
	id: "opt-1",
	name: "Info",
	description: null,
	package_id: null,
	...overrides,
	typ: "ref",
	details: INFO_DETAILS
});

describe("mapMultiplyOptionDetailToOption", () => {
	it("maps the option row id and fields", () => {
		const option = mapMultiplyOptionDetailToOption(
			buildDetail({ id: "opt-1", name: "Activity" })
		);

		expect(option).toMatchObject({
			id: "opt-1",
			name: "Activity",
			eventType: ENUM_EVENT.INFO,
			backendTyp: ENUM_EVENT_BACKEND.REF,
			details: INFO_DETAILS
		});
	});
});

describe("mapMultiplyOptionReorderToBackend", () => {
	it("builds the order from option row IDs (never indices)", () => {
		expect(
			mapMultiplyOptionReorderToBackend([
				{ id: "uuid-b" },
				{ id: "uuid-a" },
				{ id: "uuid-c" }
			])
		).toEqual({ order: ["uuid-b", "uuid-a", "uuid-c"] });
	});
});

describe("hasMultiplyOptionsOrderChanged", () => {
	it("detects reordering among surviving options", () => {
		expect(
			hasMultiplyOptionsOrderChanged(
				[{ id: "a" }, { id: "b" }],
				[{ id: "b" }, { id: "a" }]
			)
		).toBe(true);

		expect(
			hasMultiplyOptionsOrderChanged(
				[{ id: "a" }, { id: "b" }],
				[{ id: "a" }, { id: "b" }]
			)
		).toBe(false);
	});
});

describe("getRemovedMultiplyOptions", () => {
	it("returns options missing from current form state", () => {
		const removed = getRemovedMultiplyOptions(
			[{ id: "a" }, { id: "b" }, { id: "c" }],
			[{ id: "a" }, { id: "c" }]
		);

		expect(removed.map((item) => item.id)).toEqual(["b"]);
	});
});
