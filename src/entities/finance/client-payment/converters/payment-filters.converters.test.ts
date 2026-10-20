import { describe, expect, it } from "vitest";

import { mapPaymentFiltersToBackend } from "./payment.converters";

const BASE = { page: 1, limit: 10, search: "", status: [] };

describe("mapPaymentFiltersToBackend", () => {
	it("sends no new filters when they are empty", () => {
		const query = mapPaymentFiltersToBackend(BASE);

		expect(query).not.toHaveProperty("booking_id");
		expect(query).not.toHaveProperty("created_from");
		expect(query).not.toHaveProperty("created_to");
	});

	it("maps booking and created range", () => {
		const query = mapPaymentFiltersToBackend({
			...BASE,
			bookingId: "booking-1",
			createdRange: {
				from: new Date(2026, 9, 1),
				to: new Date(2026, 9, 31)
			}
		});

		expect(query).toMatchObject({
			booking_id: "booking-1",
			created_from: "2026-10-01",
			created_to: "2026-10-31"
		});
	});
});
