import { describe, expect, it } from "vitest";

import { AmenitiesTypes, HotelKind, HousingRoomTypes } from "@/shared/api";

import { buildSheetFromPubEvent } from "./preview-option-sheet.converters";

describe("buildSheetFromPubEvent — housing spec aggregate", () => {
	it("reads rooms from details.spec and does not keep hotel names", () => {
		const sheet = buildSheetFromPubEvent({
			typ: "housing",
			name: "Stay in Tashkent",
			description: "",
			day: 1,
			position: 0,
			is_optional: false,
			images: [],
			date: null,
			details: {
				duration: 2,
				check_in: null,
				check_out: null,
				spec: {
					stars: 3,
					typs: [HotelKind.Hotel],
					amenities: [AmenitiesTypes.Wifi],
					rooms: [
						{
							typ: HousingRoomTypes.Double,
							pax: 2,
							name: "Deluxe King",
							description: "Should not surface",
							images: []
						}
					]
				}
			}
		});

		expect(sheet.extra.kind).toBe("accommodation");
		if (sheet.extra.kind !== "accommodation") return;
		expect(sheet.extra.rooms[0]?.name).toBe("");
		expect(sheet.extra.rooms[0]?.description).toBe("");
		expect(sheet.extra.rooms[0]?.pax).toBe(2);
		expect(sheet.description).toBe("");
	});

	it("renders a card without supplier fields when spec is null", () => {
		const sheet = buildSheetFromPubEvent({
			typ: "housing",
			name: "Stay",
			description: null,
			day: 1,
			position: 0,
			is_optional: false,
			images: [],
			date: null,
			details: {
				duration: 1,
				check_in: null,
				check_out: null,
				spec: null
			}
		});

		expect(sheet.extra.kind).toBe("accommodation");
		if (sheet.extra.kind !== "accommodation") return;
		expect(sheet.extra.rooms).toEqual([]);
		expect(sheet.extra.amenities).toEqual([]);
	});
});

describe("buildSheetFromPubEvent — train hop", () => {
	it("reads hop from details.spec", () => {
		const sheet = buildSheetFromPubEvent({
			typ: "train",
			name: "Tashkent — Samarkand",
			description: null,
			day: 1,
			position: 0,
			is_optional: false,
			images: [],
			date: null,
			details: {
				spec: {
					hop: [
						{
							departure: {
								location: null,
								date: null,
								time: { time: "08:00:00", timezone: 5 }
							},
							arrival: {
								location: null,
								date: null,
								time: { time: "10:30:00", timezone: 5 }
							}
						}
					]
				}
			}
		});

		expect(sheet.extra.kind).toBe("flight");
		if (sheet.extra.kind !== "flight") return;
		expect(sheet.extra.segments).toHaveLength(1);
		expect(sheet.extra.segments[0]?.departureTime).toContain("08:00");
	});
});

describe("buildSheetFromPubEvent — flight hop", () => {
	it("reads hop from details.spec", () => {
		const sheet = buildSheetFromPubEvent({
			typ: "flight",
			name: "TAS — SKD",
			description: null,
			day: 1,
			position: 0,
			is_optional: false,
			images: [],
			date: null,
			details: {
				spec: {
					hop: [
						{
							airline_code: "HY",
							flight_number: 101,
							departure_airport_code: "TAS",
							arrival_airport_code: "SKD",
							departure_location: null,
							arrival_location: null,
							departure_date: null,
							arrival_date: null,
							departure_time: { time: "07:15:00", timezone: 5 },
							arrival_time: { time: "08:20:00", timezone: 5 },
							departure_terminal: null,
							departure_gate: null,
							amenities: []
						}
					]
				}
			}
		});

		expect(sheet.extra.kind).toBe("flight");
		if (sheet.extra.kind !== "flight") return;
		expect(sheet.extra.segments).toHaveLength(1);
		expect(sheet.extra.segments[0]?.departureTime).toContain("07:15");
		expect(sheet.extra.segments[0]?.airlineCode).toBe("HY");
	});
});
