import { describe, expect, it } from "vitest";

import { mapSupplierPaymentFiltersToBackend } from "./supplier-payment.converters";

const BASE = { page: 1, limit: 10, search: "", status: [] };

describe("mapSupplierPaymentFiltersToBackend", () => {
	it("sends no supplier_id without a supplier", () => {
		expect(mapSupplierPaymentFiltersToBackend(BASE)).not.toHaveProperty(
			"supplier_id"
		);
	});

	it("maps supplier", () => {
		expect(
			mapSupplierPaymentFiltersToBackend({ ...BASE, supplierId: "s-1" })
		).toMatchObject({ supplier_id: "s-1" });
	});

	it("maps event", () => {
		expect(
			mapSupplierPaymentFiltersToBackend({ ...BASE, eventId: "e-1" })
		).toMatchObject({ event_id: "e-1" });
	});
});
