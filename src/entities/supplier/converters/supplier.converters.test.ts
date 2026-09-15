import { describe, expect, it } from "vitest";

import { ENUM_SUPPLIER_TYPE } from "../types";

import { mapSupplierProductFiltersToBackend } from "./supplier-product-filters.converters";
import {
	mapSupplierFiltersToBackend,
	mapSupplierToCreate
} from "./supplier.converters";

describe("mapSupplierProductFiltersToBackend", () => {
	it("maps page to skip and omits empty fields", () => {
		expect(
			mapSupplierProductFiltersToBackend({
				page: 1,
				limit: 20
			})
		).toEqual({ limit: 20 });

		expect(
			mapSupplierProductFiltersToBackend({
				page: 3,
				limit: 10,
				search: "  hyatt  ",
				supplierId: "s1",
				typ: ENUM_SUPPLIER_TYPE.HOTEL
			})
		).toEqual({
			skip: 20,
			limit: 10,
			q: "hyatt",
			supplier_id: "s1",
			typ: "hotel"
		});
	});
});

describe("mapSupplierFiltersToBackend", () => {
	it("uses supplier_type not typ", () => {
		expect(
			mapSupplierFiltersToBackend({
				page: 2,
				limit: 15,
				search: "acme",
				supplierType: ENUM_SUPPLIER_TYPE.TRAIN
			})
		).toEqual({
			skip: 15,
			limit: 15,
			q: "acme",
			supplier_type: "train"
		});
	});
});

describe("mapSupplierToCreate", () => {
	it("maps brand_name and optional contact fields", () => {
		expect(
			mapSupplierToCreate({
				brandName: "Hyatt"
			})
		).toEqual({
			brand_name: "Hyatt",
			legal_name: null,
			phone: null,
			website: null
		});
	});
});
