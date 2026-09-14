import { describe, expect, it } from "vitest";

import {
	ENUM_HOTEL_PRICING,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type TBusProductReadBackend,
	type TFlightProductReadBackend,
	type THotelProductReadBackend,
	type TTrainProductReadBackend
} from "../types";

import {
	mapSupplierProductFromBackend,
	mapSupplierProductListToFrontend,
	mapSupplierVariantToWrite
} from "./supplier-product.converters";

const HOTEL_READ: THotelProductReadBackend = {
	typ: "hotel",
	id: "hotel-1",
	supplier_id: "s1",
	supplier_name: null,
	name: "Hyatt",
	image_paths: [],
	primary_image_path: null,
	spec: {
		pricing: "per_room",
		images: [],
		name: "Hyatt",
		location: null,
		stars: null,
		typs: [],
		amenities: [],
		policy: null,
		categories: []
	}
};

const TRAIN_READ: TTrainProductReadBackend = {
	typ: "train",
	id: "train-1",
	supplier_id: "s1",
	supplier_name: null,
	name: "Afrosiyob",
	image_paths: [],
	primary_image_path: null,
	spec: {
		pricing: "per_fare",
		images: [],
		name: "Afrosiyob",
		legs: [],
		fares: []
	}
};

const FLIGHT_READ: TFlightProductReadBackend = {
	typ: "flight",
	id: "flight-1",
	supplier_id: "s1",
	supplier_name: null,
	name: "HY 601",
	image_paths: [],
	primary_image_path: null,
	spec: {
		pricing: "per_fare",
		images: [],
		name: "HY 601",
		legs: [],
		fares: []
	}
};

const BUS_READ: TBusProductReadBackend = {
	typ: "bus",
	id: "bus-1",
	supplier_id: "s1",
	supplier_name: null,
	name: "Coach",
	image_paths: [],
	primary_image_path: null,
	spec: {
		pricing: "per_vehicle",
		images: [],
		name: "Coach",
		vehicles: []
	}
};

describe("mapSupplierProductFromBackend", () => {
	it("switches hotel and train by typ", () => {
		const hotel = mapSupplierProductFromBackend(HOTEL_READ);
		const train = mapSupplierProductFromBackend(TRAIN_READ);
		const flight = mapSupplierProductFromBackend(FLIGHT_READ);
		const bus = mapSupplierProductFromBackend(BUS_READ);

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
			data: [HOTEL_READ, TRAIN_READ]
		});

		expect(list.total).toBe(2);
		expect(list.data).toHaveLength(2);
		expect(list.data[0]?.typ).toBe(ENUM_SUPPLIER_TYPE.HOTEL);
		expect(list.data[1]?.typ).toBe(ENUM_SUPPLIER_TYPE.TRAIN);
	});
});

describe("mapSupplierVariantToWrite", () => {
	it("dispatches hotel write by typ", () => {
		const body = mapSupplierVariantToWrite({
			typ: ENUM_SUPPLIER_TYPE.HOTEL,
			pricing: ENUM_HOTEL_PRICING.WHOLE,
			data: { name: "Suite", rooms: [] }
		});

		expect(body).toMatchObject({
			typ: "hotel",
			pricing: ENUM_HOTEL_PRICING.WHOLE
		});
	});

	it("dispatches activity write without pricing", () => {
		const body = mapSupplierVariantToWrite({
			typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
			data: {
				name: "Dinner",
				expenses: {
					typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: { val: 40, currency: "USD" },
					fees: null,
					markup: null
				}
			}
		});

		expect(body.typ).toBe("activity");
		expect(body.name).toBe("Dinner");
	});
});
