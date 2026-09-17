import { describe, expect, it } from "vitest";

import { DetachKeep, LanguageCode } from "@/shared/api/generated/Api";
import { ENUM_LANGUAGES } from "@/shared/config/languages";

import {
	mapEventProductDetachToBackend,
	mapEventProductLinkToBackend,
	mapEventProductRelinkToBackend,
	mapEventProductScopeToBackend,
	mapEventProductScopeUpdateToBackend,
	mapEventReadLangQueryToBackend
} from "./event-product-link.converters";

describe("mapEventProductScopeToBackend", () => {
	it("maps all scope", () => {
		expect(mapEventProductScopeToBackend({ typ: "all" })).toEqual({
			typ: "all"
		});
	});

	it("maps only scope with a copied ids list", () => {
		const ids = ["unit-1", "unit-2"];
		const result = mapEventProductScopeToBackend({ typ: "only", ids });

		expect(result).toEqual({ typ: "only", ids: ["unit-1", "unit-2"] });
		expect(result).not.toBe(ids);
		if (result.typ === "only") {
			expect(result.ids).not.toBe(ids);
		}
	});
});

describe("mapEventProductLinkToBackend (attach)", () => {
	it("maps product id without scope", () => {
		expect(mapEventProductLinkToBackend({ productId: "p1" })).toEqual({
			product_id: "p1"
		});
	});

	it("maps product id with all scope", () => {
		expect(
			mapEventProductLinkToBackend({
				productId: "p1",
				scope: { typ: "all" }
			})
		).toEqual({
			product_id: "p1",
			scope: { typ: "all" }
		});
	});

	it("maps a selected variant into scope.only.ids (product unit id)", () => {
		expect(
			mapEventProductLinkToBackend({
				productId: "p1",
				scope: { typ: "only", ids: ["v1"] }
			})
		).toEqual({
			product_id: "p1",
			scope: { typ: "only", ids: ["v1"] }
		});
	});
});

describe("mapEventProductDetachToBackend", () => {
	it("maps keep spec without drop_override when undefined", () => {
		expect(mapEventProductDetachToBackend({ keep: "spec" })).toEqual({
			keep: DetachKeep.Spec
		});
	});

	it("maps keep nothing with drop_override", () => {
		expect(
			mapEventProductDetachToBackend({
				keep: "nothing",
				dropOverride: true
			})
		).toEqual({
			keep: DetachKeep.Nothing,
			drop_override: true
		});
	});
});

describe("mapEventProductRelinkToBackend", () => {
	it("maps product id with scope and drop_override", () => {
		expect(
			mapEventProductRelinkToBackend({
				productId: "p2",
				scope: { typ: "only", ids: ["v9"] },
				dropOverride: false
			})
		).toEqual({
			product_id: "p2",
			scope: { typ: "only", ids: ["v9"] },
			drop_override: false
		});
	});

	it("omits optional fields", () => {
		expect(mapEventProductRelinkToBackend({ productId: "p2" })).toEqual({
			product_id: "p2"
		});
	});
});

describe("mapEventProductScopeUpdateToBackend", () => {
	it("always sends scope, optionally drop_stray_overrides", () => {
		expect(
			mapEventProductScopeUpdateToBackend({ scope: { typ: "all" } })
		).toEqual({ scope: { typ: "all" } });

		expect(
			mapEventProductScopeUpdateToBackend({
				scope: { typ: "only", ids: ["v1"] },
				dropStrayOverrides: true
			})
		).toEqual({
			scope: { typ: "only", ids: ["v1"] },
			drop_stray_overrides: true
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
