import { describe, expect, it } from "vitest";

import { ENUM_EVENT, ENUM_EVENT_BACKEND } from "../types";

import { eventBoardTypeMapper } from "./event-board-type.converters";
import { eventKindMapper } from "./event-kind.converters";
import {
	isEventBackendTyp,
	mapEventTypeToBackendTyps
} from "./event-type.converters";

const toBoard = (
	typ?: (typeof ENUM_EVENT_BACKEND)[keyof typeof ENUM_EVENT_BACKEND]
) => eventBoardTypeMapper.to(eventKindMapper.from(typ));
const toBackend = (type: (typeof ENUM_EVENT)[keyof typeof ENUM_EVENT]) =>
	eventKindMapper.to(eventBoardTypeMapper.from(type));

describe("backend typ → board type", () => {
	it.each([
		[ENUM_EVENT_BACKEND.FLIGHT, ENUM_EVENT.FLIGHT],
		[ENUM_EVENT_BACKEND.TRAIN, ENUM_EVENT.FLIGHT],
		[ENUM_EVENT_BACKEND.BUS, ENUM_EVENT.FLIGHT],
		[ENUM_EVENT_BACKEND.TRANSFER, ENUM_EVENT.TRANSPORTATION],
		[ENUM_EVENT_BACKEND.HOUSING, ENUM_EVENT.ACCOMMODATION],
		[ENUM_EVENT_BACKEND.ACTIVITY, ENUM_EVENT.ACTIVITY],
		[ENUM_EVENT_BACKEND.REF, ENUM_EVENT.INFO],
		[ENUM_EVENT_BACKEND.GUIDE, ENUM_EVENT.GUIDE],
		[ENUM_EVENT_BACKEND.SUPPLEMENTARY, ENUM_EVENT.SUPPLEMENT],
		[ENUM_EVENT_BACKEND.OPTIONS, ENUM_EVENT.MULTIPLY_OPTION]
	])("%s → %s", (typ, expected) => {
		expect(toBoard(typ)).toBe(expected);
	});

	it("returns undefined for an empty typ", () => {
		expect(toBoard(undefined)).toBeUndefined();
	});
});

describe("board type → backend typ", () => {
	it.each([
		[ENUM_EVENT.FLIGHT, ENUM_EVENT_BACKEND.FLIGHT],
		[ENUM_EVENT.TRANSPORTATION, ENUM_EVENT_BACKEND.TRANSFER],
		[ENUM_EVENT.ACCOMMODATION, ENUM_EVENT_BACKEND.HOUSING],
		[ENUM_EVENT.ACTIVITY, ENUM_EVENT_BACKEND.ACTIVITY],
		[ENUM_EVENT.INFO, ENUM_EVENT_BACKEND.REF],
		[ENUM_EVENT.GUIDE, ENUM_EVENT_BACKEND.GUIDE],
		[ENUM_EVENT.SUPPLEMENT, ENUM_EVENT_BACKEND.SUPPLEMENTARY],
		[ENUM_EVENT.MULTIPLY_OPTION, ENUM_EVENT_BACKEND.OPTIONS]
	])("%s → %s", (type, expected) => {
		expect(toBackend(type)).toBe(expected);
	});

	it.each([
		ENUM_EVENT.TOUR_DETAILS,
		ENUM_EVENT.EVENT_LIBRARY,
		ENUM_EVENT.ITINERARY_LIBRARY,
		ENUM_EVENT.PACKAGE
	])("%s has no backend typ", (type) => {
		expect(toBackend(type)).toBeUndefined();
	});
});

describe("mapEventTypeToBackendTyps", () => {
	it("expands FLIGHT into flight, train, bus", () => {
		expect(mapEventTypeToBackendTyps(ENUM_EVENT.FLIGHT)).toEqual([
			ENUM_EVENT_BACKEND.FLIGHT,
			ENUM_EVENT_BACKEND.TRAIN,
			ENUM_EVENT_BACKEND.BUS
		]);
	});

	it("keeps a single typ for other types and none for UI-only ones", () => {
		expect(mapEventTypeToBackendTyps(ENUM_EVENT.ACCOMMODATION)).toEqual([
			ENUM_EVENT_BACKEND.HOUSING
		]);
		expect(mapEventTypeToBackendTyps(ENUM_EVENT.TOUR_DETAILS)).toEqual([]);
	});
});

describe("isEventBackendTyp", () => {
	it("accepts backend typ strings only", () => {
		expect(isEventBackendTyp(ENUM_EVENT_BACKEND.BUS)).toBe(true);
		expect(isEventBackendTyp("bogus")).toBe(false);
		expect(isEventBackendTyp(undefined)).toBe(false);
	});
});
