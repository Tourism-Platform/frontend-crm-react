import { describe, expect, it } from "vitest";

import {
	type ActivityDetailsOutput,
	Currency,
	type HousingDetailsOutput,
	HousingRoomTypes,
	type InformationDetailsOutput
} from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "../../types";

import { mapEventDetailsReadToWrite } from "./details-read-to-write.converters";

const IMAGE = { image_path: "/img/1.png", is_primary: true };

const FIXED_CHARGE = {
	typ: "fixed" as const,
	cost: { val: 100, currency: Currency.USD },
	fees: null,
	extra_costs: [],
	markup: null
};

describe("mapEventDetailsReadToWrite — product supply", () => {
	it("keeps only { source, product_id, scope } and drops supplier/override/spec", () => {
		const details: HousingDetailsOutput = {
			plan: { duration: 2, check_in: null, check_out: null },
			supply: {
				source: "product",
				product_id: "product-1",
				supplier: { id: "sup-1", name: "Supplier" },
				scope: { typ: "only", ids: ["unit-1"] },
				override: null
			},
			spec: {
				pricing: "per_room",
				images: [IMAGE],
				name: "Hotel",
				location: null,
				stars: 4,
				typs: [],
				amenities: [],
				policy: null,
				categories: []
			}
		};

		const result = mapEventDetailsReadToWrite(
			ENUM_EVENT_BACKEND.HOUSING,
			details
		);

		expect(result).toEqual({
			plan: { duration: 2, check_in: null, check_out: null },
			supply: {
				source: "product",
				product_id: "product-1",
				scope: { typ: "only", ids: ["unit-1"] }
			}
		});
		// READ-only fields must not leak into the WRITE body
		expect(JSON.stringify(result)).not.toContain("supplier");
		expect(JSON.stringify(result)).not.toContain("override");
		expect(result).not.toHaveProperty("spec");
	});

	it("maps scope all", () => {
		const details: InformationDetailsOutput = {
			plan: {},
			supply: { source: "inline", supplier_id: null },
			spec: {}
		};

		const result = mapEventDetailsReadToWrite(
			ENUM_EVENT_BACKEND.REF,
			details
		);

		expect(result).toEqual({
			plan: {},
			supply: { source: "inline", supplier_id: null }
		});
	});
});

describe("mapEventDetailsReadToWrite — inline supply", () => {
	it("moves the read spec into supply.inline.spec and strips images", () => {
		const details: HousingDetailsOutput = {
			plan: { duration: null, check_in: null, check_out: null },
			supply: { source: "inline", supplier_id: "sup-9" },
			spec: {
				pricing: "per_room",
				images: [IMAGE],
				name: "Inline hotel",
				location: null,
				stars: null,
				typs: [],
				amenities: [],
				policy: null,
				categories: [
					{
						id: "cat-1",
						name: null,
						rooms: [
							{
								id: "room-1",
								images: [IMAGE],
								typ: HousingRoomTypes.Double,
								pax: 2,
								name: "Std",
								description: null,
								rate: { base: FIXED_CHARGE, seasons: [] }
							}
						]
					}
				]
			}
		};

		const result = mapEventDetailsReadToWrite(
			ENUM_EVENT_BACKEND.HOUSING,
			details
		);

		expect(result).not.toHaveProperty("spec");
		const supply = (result as { supply?: unknown }).supply;
		expect(supply).toMatchObject({
			source: "inline",
			supplier_id: "sup-9"
		});

		const spec = (supply as { spec: Record<string, unknown> }).spec;
		expect(spec).not.toHaveProperty("images");
		expect(spec.pricing).toBe("per_room");

		const categories = spec.categories as {
			rooms: Record<string, unknown>[];
		}[];
		expect(categories[0].rooms[0]).not.toHaveProperty("images");
		expect(categories[0].rooms[0].id).toBe("room-1");
	});

	it("strips menu item images from activity food spec", () => {
		const details: ActivityDetailsOutput = {
			plan: { start_time: null, end_time: null },
			supply: { source: "inline", supplier_id: null },
			spec: {
				sub_typ: "food",
				images: [IMAGE],
				name: "Dinner",
				location: null,
				offerings: [
					{
						id: "off-1",
						name: "Set menu",
						charge: FIXED_CHARGE,
						menu: [
							{
								id: "menu-1",
								images: [IMAGE],
								name: "Soup",
								description: null
							}
						]
					}
				]
			}
		};

		const result = mapEventDetailsReadToWrite(
			ENUM_EVENT_BACKEND.ACTIVITY,
			details
		);

		const supply = (result as { supply: { spec: unknown } }).supply;
		const spec = supply.spec as {
			sub_typ: string;
			offerings: { menu: Record<string, unknown>[] }[];
		};
		expect(spec.sub_typ).toBe("food");
		expect(spec.offerings[0].menu[0]).not.toHaveProperty("images");
		expect(spec.offerings[0].menu[0].name).toBe("Soup");
	});
});

describe("mapEventDetailsReadToWrite — unsupported typ", () => {
	it("throws for options", () => {
		expect(() =>
			mapEventDetailsReadToWrite(ENUM_EVENT_BACKEND.OPTIONS, {
				plan: {},
				supply: { source: "inline", supplier_id: null },
				spec: {}
			})
		).toThrow();
	});
});
