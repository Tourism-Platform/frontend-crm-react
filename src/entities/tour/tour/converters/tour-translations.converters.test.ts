import { describe, expect, it } from "vitest";

import {
	mapRegenerateTranslationsQueryToBackend,
	mapRegenerateTranslationsToFrontend
} from "./tour-translations.converters";

describe("mapRegenerateTranslationsQueryToBackend", () => {
	it("omits force by default", () => {
		expect(mapRegenerateTranslationsQueryToBackend()).toEqual({});
		expect(mapRegenerateTranslationsQueryToBackend(false)).toEqual({});
	});

	it("sends force=true when forced", () => {
		expect(mapRegenerateTranslationsQueryToBackend(true)).toEqual({
			force: true
		});
	});
});

describe("mapRegenerateTranslationsToFrontend", () => {
	it("maps the scheduling summary to camelCase", () => {
		expect(
			mapRegenerateTranslationsToFrontend({
				scheduled: true,
				landing: true,
				events_scheduled: 7,
				events_skipped: 2,
				target_languages: 3
			})
		).toEqual({
			scheduled: true,
			landing: true,
			eventsScheduled: 7,
			eventsSkipped: 2,
			targetLanguages: 3
		});
	});
});
