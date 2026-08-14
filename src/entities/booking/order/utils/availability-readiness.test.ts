import { describe, expect, it } from "vitest";

import { ENUM_AVAILABILITY_STATUS } from "../types/availability-status.types";
import type { IBookingEventAvailability } from "../types/booking-availability.types";

import {
	getAvailabilityReadiness,
	getAvailabilitySelectionProgress,
	groupAvailabilityByEventId,
	isAvailabilityApplyEnabled,
	isEventGroupReady
} from "./availability-readiness";

const row = (
	partial: Pick<
		IBookingEventAvailability,
		"eventId" | "optionIndex" | "status"
	>
): IBookingEventAvailability => ({
	id: `${partial.eventId}-${partial.optionIndex}`,
	bookingId: "b1",
	eventName: null,
	eventType: null,
	...partial
});

describe("availability-readiness", () => {
	it("groups rows by eventId preserving first-seen order", () => {
		const groups = groupAvailabilityByEventId([
			row({
				eventId: "e2",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.PENDING
			}),
			row({
				eventId: "e1",
				optionIndex: 1,
				status: ENUM_AVAILABILITY_STATUS.PENDING
			}),
			row({
				eventId: "e1",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.AVAILABLE
			})
		]);

		expect(groups.map((g) => g.eventId)).toEqual(["e2", "e1"]);
		expect(groups[1]?.rows.map((r) => r.optionIndex)).toEqual([0, 1]);
	});

	it("marks singular event ready only when SELECTED", () => {
		expect(
			isEventGroupReady([
				row({
					eventId: "e1",
					optionIndex: 0,
					status: ENUM_AVAILABILITY_STATUS.AVAILABLE
				})
			])
		).toBe(false);

		expect(
			isEventGroupReady([
				row({
					eventId: "e1",
					optionIndex: 0,
					status: ENUM_AVAILABILITY_STATUS.SELECTED
				})
			])
		).toBe(true);
	});

	it("requires exactly one SELECTED in multi-option group", () => {
		const none = getAvailabilityReadiness([
			row({
				eventId: "multi",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.AVAILABLE
			}),
			row({
				eventId: "multi",
				optionIndex: 1,
				status: ENUM_AVAILABILITY_STATUS.PENDING
			})
		]);
		expect(none.ready).toBe(false);
		expect(none.incompleteEventIds).toEqual(["multi"]);

		const one = getAvailabilityReadiness([
			row({
				eventId: "multi",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			}),
			row({
				eventId: "multi",
				optionIndex: 1,
				status: ENUM_AVAILABILITY_STATUS.DESELECTED
			})
		]);
		expect(one.ready).toBe(true);

		const two = getAvailabilityReadiness([
			row({
				eventId: "multi",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			}),
			row({
				eventId: "multi",
				optionIndex: 1,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			})
		]);
		expect(two.ready).toBe(false);
		expect(two.multiOptionViolations).toEqual([
			{
				eventId: "multi",
				selectedCount: 2,
				optionIndexes: [0, 1]
			}
		]);
	});

	it("counts selected groups, not every multi-option row", () => {
		const progress = getAvailabilitySelectionProgress([
			row({
				eventId: "flight",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			}),
			row({
				eventId: "multi",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			}),
			row({
				eventId: "multi",
				optionIndex: 1,
				status: ENUM_AVAILABILITY_STATUS.DESELECTED
			}),
			row({
				eventId: "activity",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.AVAILABLE
			})
		]);

		expect(progress).toEqual({
			selected: 2,
			total: 3,
			complete: false
		});
	});

	it("marks progress complete when every group has one SELECTED", () => {
		const progress = getAvailabilitySelectionProgress([
			row({
				eventId: "flight",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			}),
			row({
				eventId: "multi",
				optionIndex: 0,
				status: ENUM_AVAILABILITY_STATUS.DESELECTED
			}),
			row({
				eventId: "multi",
				optionIndex: 1,
				status: ENUM_AVAILABILITY_STATUS.SELECTED
			})
		]);

		expect(progress.complete).toBe(true);
		expect(progress.selected).toBe(2);
		expect(progress.total).toBe(2);
	});

	it("enables apply from backend statuses that still have a next step", () => {
		expect(
			isAvailabilityApplyEnabled(ENUM_AVAILABILITY_STATUS.PENDING)
		).toBe(true);
		expect(
			isAvailabilityApplyEnabled(ENUM_AVAILABILITY_STATUS.DESELECTED)
		).toBe(true);
		expect(
			isAvailabilityApplyEnabled(ENUM_AVAILABILITY_STATUS.SELECTED)
		).toBe(false);
	});
});
