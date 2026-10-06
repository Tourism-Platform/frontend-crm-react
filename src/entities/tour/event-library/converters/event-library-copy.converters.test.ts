import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES } from "@/shared/config";

import {
	mapEventLibraryCopyQueryToBackend,
	mapEventLibraryCopyToBackend
} from "./event-library-copy.converters";

describe("mapEventLibraryCopyToBackend", () => {
	it("maps a library source", () => {
		expect(
			mapEventLibraryCopyToBackend({
				kind: "library",
				libraryId: "lib-1"
			})
		).toEqual({ source: { kind: "library", library_id: "lib-1" } });
	});

	it("maps a tour event alternative source", () => {
		expect(
			mapEventLibraryCopyToBackend({
				kind: "event",
				tourId: "t-1",
				optionId: "o-1",
				eventOptionId: "eo-1"
			})
		).toEqual({
			source: {
				kind: "event",
				tour_id: "t-1",
				option_id: "o-1",
				event_option_id: "eo-1"
			}
		});
	});
});

describe("mapEventLibraryCopyQueryToBackend", () => {
	it("sends no read_lang without a language", () => {
		expect(mapEventLibraryCopyQueryToBackend()).toEqual({});
	});

	it("maps UI language to read_lang", () => {
		expect(mapEventLibraryCopyQueryToBackend(ENUM_LANGUAGES.EN)).toEqual({
			read_lang: LanguageCode.En
		});
	});
});
