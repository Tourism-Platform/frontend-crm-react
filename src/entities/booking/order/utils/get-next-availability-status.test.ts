import { describe, expect, it } from "vitest";

import { ApplyAvailabilityInput } from "@/shared/api/generated/Api";

import { ENUM_AVAILABILITY_STATUS } from "../types/availability-status.types";

import { getNextAvailabilityApplyStatus } from "./get-next-availability-status";

describe("getNextAvailabilityApplyStatus", () => {
	it("maps pending → available and available → selected", () => {
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.PENDING)
		).toBe(ApplyAvailabilityInput.Available);
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.AVAILABLE)
		).toBe(ApplyAvailabilityInput.Selected);
	});

	it("allows re-select after backend deselected a multi-option sibling", () => {
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.DESELECTED)
		).toBe(ApplyAvailabilityInput.Selected);
	});

	it("blocks further apply when already selected", () => {
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.SELECTED)
		).toBeNull();
	});
});
