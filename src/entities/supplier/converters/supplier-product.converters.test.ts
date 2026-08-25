import { describe, expect, it } from "vitest";

import { ENUM_SUPPLIER_TYPE } from "../types";

import {
	mapSupplierProductFromBackend,
	mapSupplierProductListToFrontend
} from "./supplier-product.converters";

describe("mapSupplierProductFromBackend", () => {
	it("switches hotel and train by typ", () => {
		const hotel = mapSupplierProductFromBackend({
			typ: "hotel",
			id: "hotel-1",
			supplier_id: "s1",
			name: "Hyatt"
		});
		const train = mapSupplierProductFromBackend({
			typ: "train",
			id: "train-1",
			supplier_id: "s1",
			name: "Afrosiyob",
			hop: []
		});

		expect(hotel.typ).toBe(ENUM_SUPPLIER_TYPE.HOTEL);
		expect(train.typ).toBe(ENUM_SUPPLIER_TYPE.TRAIN);
		expect("hops" in train).toBe(true);
	});
});

describe("mapSupplierProductListToFrontend", () => {
	it("maps total_count to total", () => {
		const list = mapSupplierProductListToFrontend({
			total_count: 2,
			data: [
				{
					typ: "hotel",
					id: "hotel-1",
					supplier_id: "s1",
					name: "Hyatt"
				},
				{
					typ: "train",
					id: "train-1",
					supplier_id: "s1",
					name: "Afrosiyob",
					hop: []
				}
			]
		});

		expect(list.total).toBe(2);
		expect(list.data).toHaveLength(2);
		expect(list.data[0]?.typ).toBe(ENUM_SUPPLIER_TYPE.HOTEL);
		expect(list.data[1]?.typ).toBe(ENUM_SUPPLIER_TYPE.TRAIN);
	});
});
