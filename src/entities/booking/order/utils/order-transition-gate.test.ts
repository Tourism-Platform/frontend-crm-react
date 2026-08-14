import { describe, expect, it } from "vitest";

import { ENUM_AVAILABILITY_STATUS } from "../types/availability-status.types";
import type { IBookingEventAvailability } from "../types/booking-availability.types";
import { ENUM_ORDER_STATUS } from "../types/order-status.types";

import { getOrderTransitionGate } from "./order-transition-gate";

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

describe("order-transition-gate", () => {
	it("allows NEW → IN_PROCESSING without availability", () => {
		const gate = getOrderTransitionGate({
			status: ENUM_ORDER_STATUS.NEW
		});
		expect(gate.allowed).toBe(true);
		expect(gate.nextStatus).toBe(ENUM_ORDER_STATUS.IN_PROCESSING);
	});

	it("blocks IN_PROCESSING → BOOKING until each event has one SELECTED", () => {
		const blocked = getOrderTransitionGate({
			status: ENUM_ORDER_STATUS.IN_PROCESSING,
			availability: [
				row({
					eventId: "flight",
					optionIndex: 0,
					status: ENUM_AVAILABILITY_STATUS.AVAILABLE
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
				})
			]
		});

		expect(blocked.allowed).toBe(false);
		expect(blocked.reasons[0]).toContain("availability_incomplete:flight");

		const allowed = getOrderTransitionGate({
			status: ENUM_ORDER_STATUS.IN_PROCESSING,
			availability: [
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
				})
			]
		});

		expect(allowed.allowed).toBe(true);
		expect(allowed.nextStatus).toBe(ENUM_ORDER_STATUS.BOOKING);
	});

	it("blocks when multi-option has two SELECTED from backend", () => {
		const gate = getOrderTransitionGate({
			status: ENUM_ORDER_STATUS.IN_PROCESSING,
			availability: [
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
			]
		});

		expect(gate.allowed).toBe(false);
		expect(gate.reasons.some((r) => r.startsWith("multi_option"))).toBe(
			true
		);
	});

	it("allows BOOKING → IN_PROGRESS without availability gate", () => {
		const gate = getOrderTransitionGate({
			status: ENUM_ORDER_STATUS.BOOKING,
			availability: []
		});
		expect(gate.allowed).toBe(true);
		expect(gate.nextStatus).toBe(ENUM_ORDER_STATUS.IN_PROGRESS);
	});

	it("rejects terminal COMPLETED", () => {
		const gate = getOrderTransitionGate({
			status: ENUM_ORDER_STATUS.COMPLETED
		});
		expect(gate.allowed).toBe(false);
		expect(gate.reasons).toEqual(["no_next_status"]);
	});
});
