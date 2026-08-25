import { describe, expect, it } from "vitest";

import { LanguageCode } from "@/shared/api/generated/Api";
import { ENUM_LANGUAGES } from "@/shared/config/languages";

import {
	mapEventProductLinkToBackend,
	mapEventReadLangQueryToBackend
} from "./event-product-link.converters";

describe("mapEventProductLinkToBackend", () => {
	it("maps product and variant ids", () => {
		expect(
			mapEventProductLinkToBackend({
				productId: "p1",
				variantId: "v1"
			})
		).toEqual({
			product_id: "p1",
			variant_id: "v1"
		});
	});

	it("sends null variant when undefined or null", () => {
		expect(
			mapEventProductLinkToBackend({
				productId: "p1"
			})
		).toEqual({
			product_id: "p1",
			variant_id: null
		});

		expect(
			mapEventProductLinkToBackend({
				productId: "p1",
				variantId: null
			})
		).toEqual({
			product_id: "p1",
			variant_id: null
		});
	});
});

describe("mapEventReadLangQueryToBackend", () => {
	it("returns empty object without language", () => {
		expect(mapEventReadLangQueryToBackend()).toEqual({});
	});

	it("maps UI language to read_lang", () => {
		expect(mapEventReadLangQueryToBackend(ENUM_LANGUAGES.EN)).toEqual({
			read_lang: LanguageCode.En
		});
	});
});
