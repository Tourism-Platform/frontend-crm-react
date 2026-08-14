import type { IBookingEventAvailability } from "../types/booking-availability.types";
import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE
} from "../types/order-status.types";

import { getAvailabilityReadiness } from "./availability-readiness";

export const NEXT_ORDER_STATUS: Partial<
	Record<ENUM_ORDER_STATUS_TYPE, ENUM_ORDER_STATUS_TYPE>
> = {
	[ENUM_ORDER_STATUS.NEW]: ENUM_ORDER_STATUS.IN_PROCESSING,
	[ENUM_ORDER_STATUS.IN_PROCESSING]: ENUM_ORDER_STATUS.BOOKING,
	[ENUM_ORDER_STATUS.BOOKING]: ENUM_ORDER_STATUS.IN_PROGRESS,
	[ENUM_ORDER_STATUS.IN_PROGRESS]: ENUM_ORDER_STATUS.COMPLETED
};

export type TOrderTransitionGate = {
	allowed: boolean;
	nextStatus?: ENUM_ORDER_STATUS_TYPE;
	reasons: string[];
};

type TOrderTransitionGateInput = {
	status: ENUM_ORDER_STATUS_TYPE;
	availability?: IBookingEventAvailability[];
};

/**
 * UI gate derived from backend state (availability rows are source of truth).
 * Does not invent multi-option rules — only reads SELECTED counts from API data.
 */
export const getOrderTransitionGate = ({
	status,
	availability = []
}: TOrderTransitionGateInput): TOrderTransitionGate => {
	const nextStatus = NEXT_ORDER_STATUS[status];

	if (!nextStatus) {
		return {
			allowed: false,
			reasons: ["no_next_status"]
		};
	}

	if (status === ENUM_ORDER_STATUS.IN_PROCESSING) {
		const readiness = getAvailabilityReadiness(availability);

		if (!readiness.ready) {
			const reasons: string[] = [];

			if (readiness.incompleteEventIds.length > 0) {
				reasons.push(
					`availability_incomplete:${readiness.incompleteEventIds.join(",")}`
				);
			}

			if (readiness.multiOptionViolations.length > 0) {
				reasons.push(
					`multi_option_multiple_selected:${readiness.multiOptionViolations
						.map((v) => `${v.eventId}(${v.selectedCount})`)
						.join(",")}`
				);
			}

			return {
				allowed: false,
				nextStatus,
				reasons
			};
		}
	}

	return {
		allowed: true,
		nextStatus,
		reasons: []
	};
};
