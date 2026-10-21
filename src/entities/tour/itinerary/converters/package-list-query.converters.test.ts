import { describe, expect, it } from "vitest";

import { mapPackagesQueryToBackend } from "./package.converters";

const BASE = { tourId: "tour", optionId: "option" };

describe("mapPackagesQueryToBackend", () => {
	it("sends no q when search is empty", () => {
		expect(mapPackagesQueryToBackend({ ...BASE, search: "  " })).toEqual(
			{}
		);
	});

	it("maps trimmed search to q", () => {
		expect(mapPackagesQueryToBackend({ ...BASE, search: " lux " })).toEqual(
			{
				q: "lux"
			}
		);
	});
});
