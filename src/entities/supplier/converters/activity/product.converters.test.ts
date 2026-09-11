import { describe, expect, it } from "vitest";

import { ENUM_ACTIVITY_SUB_TYPE } from "../../types";

import { mapActivityProductToCreate } from "./product.converters";

describe("mapActivityProductToCreate", () => {
	it("maps venue location and sub type", () => {
		expect(
			mapActivityProductToCreate({
				name: "Registan walking tour",
				subTyp: ENUM_ACTIVITY_SUB_TYPE.SIGHTSEEING,
				location: { lat: 39.65, long: 66.97 }
			})
		).toEqual({
			typ: "activity",
			name: "Registan walking tour",
			details: {
				typ: "activity",
				sub_typ: "sightseeing",
				location: { lat: 39.65, long: 66.97 }
			}
		});
	});
});
