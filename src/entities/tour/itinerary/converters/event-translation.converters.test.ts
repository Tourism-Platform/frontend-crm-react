import { describe, expect, it } from "vitest";

import { TranslationState } from "@/shared/api";

import { ENUM_EVENT_TRANSLATION } from "../types";

import { eventTranslationMapper } from "./event-translation.converters";

describe("eventTranslationMapper", () => {
	it("maps backend translation state to the UI enum", () => {
		expect(eventTranslationMapper.from(TranslationState.Pending)).toBe(
			ENUM_EVENT_TRANSLATION.PENDING
		);
		expect(eventTranslationMapper.from(TranslationState.Ready)).toBe(
			ENUM_EVENT_TRANSLATION.READY
		);
		expect(eventTranslationMapper.from(TranslationState.Source)).toBe(
			ENUM_EVENT_TRANSLATION.SOURCE
		);
	});
});
