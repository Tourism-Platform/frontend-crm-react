import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES } from "@/shared/config";

import {
	mapOrderLangQueryToBackend,
	mapReadLangQueryToBackend
} from "./language-code.converters";

describe("mapReadLangQueryToBackend", () => {
	it("sends no read_lang without a language", () => {
		expect(mapReadLangQueryToBackend()).toEqual({});
	});

	it("maps UI language to read_lang", () => {
		expect(mapReadLangQueryToBackend(ENUM_LANGUAGES.RU)).toEqual({
			read_lang: LanguageCode.Ru
		});
	});
});

describe("mapOrderLangQueryToBackend", () => {
	it("sends no lang without a language", () => {
		expect(mapOrderLangQueryToBackend()).toEqual({});
	});

	it("maps UI language to lang", () => {
		expect(mapOrderLangQueryToBackend(ENUM_LANGUAGES.UZ)).toEqual({
			lang: LanguageCode.Uz
		});
	});
});
