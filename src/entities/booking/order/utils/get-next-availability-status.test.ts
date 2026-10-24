import { describe, expect, it } from "vitest";

import { ENUM_APPLY_AVAILABILITY_INPUT_BACKEND } from "../types";
import { ENUM_AVAILABILITY_STATUS } from "../types/availability-status.types";

import { getNextAvailabilityApplyStatus } from "./get-next-availability-status";

describe("getNextAvailabilityApplyStatus", () => {
	it("maps pending → available and available → selected", () => {
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.PENDING)
		).toBe(ENUM_APPLY_AVAILABILITY_INPUT_BACKEND.AVAILABLE);
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.AVAILABLE)
		).toBe(ENUM_APPLY_AVAILABILITY_INPUT_BACKEND.SELECTED);
	});

	it("allows re-select after backend deselected a multi-option sibling", () => {
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.DESELECTED)
		).toBe(ENUM_APPLY_AVAILABILITY_INPUT_BACKEND.SELECTED);
	});

	it("blocks further apply when already selected", () => {
		expect(
			getNextAvailabilityApplyStatus(ENUM_AVAILABILITY_STATUS.SELECTED)
		).toBeNull();
	});
});
