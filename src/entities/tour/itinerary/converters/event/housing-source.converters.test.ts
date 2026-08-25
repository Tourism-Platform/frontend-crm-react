import { describe, expect, it } from "vitest";

import { ENUM_HOUSING_SOURCE } from "../../types";

import { housingSourceConverter } from "./housing-source.converters";

describe("housingSourceConverter", () => {
	it("maps custom both ways", () => {
		expect(housingSourceConverter.to(ENUM_HOUSING_SOURCE.CUSTOM)).toBe(
			"custom"
		);
		expect(housingSourceConverter.from("custom")).toBe(
			ENUM_HOUSING_SOURCE.CUSTOM
		);
	});

	it("maps inherited both ways", () => {
		expect(housingSourceConverter.to(ENUM_HOUSING_SOURCE.INHERITED)).toBe(
			"inherited"
		);
		expect(housingSourceConverter.from("inherited")).toBe(
			ENUM_HOUSING_SOURCE.INHERITED
		);
	});
});
