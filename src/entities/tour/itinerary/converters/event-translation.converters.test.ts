import { describe, expect, it } from "vitest";

import {
	ENUM_EVENT_TRANSLATION,
	ENUM_TRANSLATION_STATE_BACKEND
} from "../types";

import { eventTranslationMapper } from "./event-translation.converters";

describe("eventTranslationMapper", () => {
	it("maps backend translation state to the UI enum", () => {
		expect(
			eventTranslationMapper.from(ENUM_TRANSLATION_STATE_BACKEND.PENDING)
		).toBe(ENUM_EVENT_TRANSLATION.PENDING);
		expect(
			eventTranslationMapper.from(ENUM_TRANSLATION_STATE_BACKEND.READY)
		).toBe(ENUM_EVENT_TRANSLATION.READY);
		expect(
			eventTranslationMapper.from(ENUM_TRANSLATION_STATE_BACKEND.SOURCE)
		).toBe(ENUM_EVENT_TRANSLATION.SOURCE);
	});
});
