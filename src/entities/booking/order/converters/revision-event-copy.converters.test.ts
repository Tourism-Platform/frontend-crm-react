import { describe, expect, it } from "vitest";

import { mapRevisionEventCopyToBackend } from "./revision-event-product.converters";

describe("mapRevisionEventCopyToBackend", () => {
	it("maps a snapshot (revision) source", () => {
		expect(
			mapRevisionEventCopyToBackend({ kind: "revision", eventId: "ev-1" })
		).toEqual({ source: { kind: "revision", event_id: "ev-1" } });
	});

	it("maps a live tour event source", () => {
		expect(
			mapRevisionEventCopyToBackend({ kind: "event", eventId: "ev-2" })
		).toEqual({ source: { kind: "event", event_id: "ev-2" } });
	});
});
