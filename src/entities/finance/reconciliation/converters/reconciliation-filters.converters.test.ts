import { describe, expect, it } from "vitest";

import { mapReconciliationFiltersToBackend } from "./reconciliation.converters";

const BASE = { page: 1, limit: 10, search: "", status: [] };

describe("mapReconciliationFiltersToBackend", () => {
	it("sends no new filters when they are empty", () => {
		const query = mapReconciliationFiltersToBackend(BASE);

		expect(query).not.toHaveProperty("tour_id");
		expect(query).not.toHaveProperty("date_from");
		expect(query).not.toHaveProperty("date_to");
		expect(query).not.toHaveProperty("outstanding_only");
		expect(query).not.toHaveProperty("payable_only");
	});

	it("maps tour, period and flags", () => {
		expect(
			mapReconciliationFiltersToBackend({
				...BASE,
				tourId: "tour-1",
				dateRange: {
					from: new Date(2026, 0, 5),
					to: new Date(2026, 1, 1)
				},
				outstandingOnly: true,
				payableOnly: true
			})
		).toMatchObject({
			tour_id: "tour-1",
			date_from: "2026-01-05",
			date_to: "2026-02-01",
			outstanding_only: true,
			payable_only: true
		});
	});
});
