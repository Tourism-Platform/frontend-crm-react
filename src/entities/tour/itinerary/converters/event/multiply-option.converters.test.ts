import { describe, expect, it } from "vitest";

import { ENUM_EVENT_BACKEND } from "../../types/event-backend-enum.types";
import { ENUM_EVENT } from "../../types/event-enum.types";

import {
	getRemovedMultiplyOptions,
	mapMultiplyOptionDetailToOption
} from "./multiply-option.converters";

describe("mapMultiplyOptionDetailToOption", () => {
	it("maps is_optional true to isOptional", () => {
		const option = mapMultiplyOptionDetailToOption({
			id: "opt-1",
			name: "Activity",
			description: "Desc",
			typ: ENUM_EVENT_BACKEND.ACTIVITY,
			is_optional: true,
			details: { foo: "bar" }
		} as Parameters<typeof mapMultiplyOptionDetailToOption>[0]);

		expect(option).toMatchObject({
			id: "opt-1",
			name: "Activity",
			isOptional: true,
			eventType: ENUM_EVENT.ACTIVITY
		});
	});

	// it("defaults missing is_optional to false", () => {
	// 	const option = mapMultiplyOptionDetailToOption({
	// 		id: "opt-2",
	// 		name: "Flight",
	// 		typ: ENUM_EVENT_BACKEND.FLIGHT
	// 	} as Parameters<typeof mapMultiplyOptionDetailToOption>[0]);

	// 	expect(option?.isOptional).toBe(false);
	// });
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
