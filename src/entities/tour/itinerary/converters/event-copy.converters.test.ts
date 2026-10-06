import { describe, expect, it } from "vitest";

import { mapEventCopyToBackend } from "./event-copy.converters";

describe("mapEventCopyToBackend", () => {
	it("maps a library source with placement and is_optional", () => {
		expect(
			mapEventCopyToBackend({
				kind: "library",
				libraryId: "lib-1",
				day: 2,
				position: 0,
				isOptional: true
			})
		).toEqual({
			source: {
				kind: "library",
				library_id: "lib-1",
				day: 2,
				position: 0,
				is_optional: true
			}
		});
	});

	it("omits is_optional when not set", () => {
		expect(
			mapEventCopyToBackend({
				kind: "library",
				libraryId: "lib-1",
				day: 1,
				position: 3
			}).source
		).not.toHaveProperty("is_optional");
	});

	it("maps an event source and leaves placement to the backend by default", () => {
		expect(
			mapEventCopyToBackend({ kind: "event", eventId: "ev-1" })
		).toEqual({ source: { kind: "event", event_id: "ev-1" } });
	});

	it("keeps explicit day/position on an event source", () => {
		expect(
			mapEventCopyToBackend({
				kind: "event",
				eventId: "ev-1",
				day: 3,
				position: 0
			})
		).toEqual({
			source: { kind: "event", event_id: "ev-1", day: 3, position: 0 }
		});
	});
});
