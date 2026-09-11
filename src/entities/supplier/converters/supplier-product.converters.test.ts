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
		const flight = mapSupplierProductFromBackend({
			typ: "flight",
			id: "flight-1",
			supplier_id: "s1",
			name: "HY 601",
			hop: []
		});
		const bus = mapSupplierProductFromBackend({
			typ: "bus",
			id: "bus-1",
			supplier_id: "s1",
			name: "Coach"
		});

		expect(hotel.typ).toBe(ENUM_SUPPLIER_TYPE.HOTEL);
		expect(train.typ).toBe(ENUM_SUPPLIER_TYPE.TRAIN);
		expect(flight.typ).toBe(ENUM_SUPPLIER_TYPE.FLIGHT);
		expect(bus.typ).toBe(ENUM_SUPPLIER_TYPE.BUS);
		expect("hops" in train).toBe(true);
		expect("hops" in flight).toBe(true);
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
