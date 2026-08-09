import { describe, expect, it } from "vitest";

import { ENUM_EVENT_BACKEND } from "../types";

import { mapBackendEventToTimeSubtitle } from "./event-time-range.converters";

describe("mapBackendEventToTimeSubtitle", () => {
	it("formats activity start/end", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.ACTIVITY, {
				start_time: { time: "09:00:00", timezone: 5 },
				end_time: { time: "17:30:00", timezone: 5 }
			})
		).toBe("09:00 – 17:30");
	});

	it("formats housing check-in/out", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.HOUSING, {
				check_in: { time: "14:00:00" },
				check_out: { time: "11:00:00" }
			})
		).toBe("14:00 – 11:00");
	});

	it("formats transfer departure/arrival", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.TRANSFER, {
				departure: { time: { time: "08:15:00" } },
				arrival: { time: { time: "09:45:00" } }
			})
		).toBe("08:15 – 09:45");
	});

	it("formats flight hops from first departure and last arrival", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.FLIGHT, {
				hop: [
					{
						departure_time: { time: "10:00:00" },
						arrival_time: { time: "12:00:00" }
					},
					{
						departure_time: { time: "13:00:00" },
						arrival_time: { time: "15:20:00" }
					}
				]
			})
		).toBe("10:00 – 15:20");
	});

	it("does not fall back to first hop arrival for flight end", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.FLIGHT, {
				hop: [
					{
						departure_time: { time: "10:00:00" },
						arrival_time: { time: "12:00:00" }
					},
					{
						departure_time: { time: "13:00:00" }
					}
				]
			})
		).toBe("10:00");
	});

	it("formats train/bus journey hops", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.TRAIN, {
				hop: [
					{
						departure: { time: { time: "06:30:00" } },
						arrival: { time: { time: "08:00:00" } }
					}
				]
			})
		).toBe("06:30 – 08:00");
	});

	it("returns undefined for guide/supplement/options", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.GUIDE, {})
		).toBeUndefined();
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.SUPPLEMENTARY, {})
		).toBeUndefined();
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.OPTIONS, {})
		).toBeUndefined();
	});

	it("returns single edge when only one time is present", () => {
		expect(
			mapBackendEventToTimeSubtitle(ENUM_EVENT_BACKEND.REF, {
				start_time: { time: "12:00:00" }
			})
		).toBe("12:00");
	});
});
