import { ApplyAvailabilityInput } from "@/shared/api";

import {
	ENUM_AVAILABILITY_STATUS,
	type ENUM_AVAILABILITY_STATUS_TYPE
} from "../types/availability-status.types";

export const getNextAvailabilityApplyStatus = (
	current?: ENUM_AVAILABILITY_STATUS_TYPE
): ApplyAvailabilityInput | null => {
	switch (current) {
		case undefined:
		case ENUM_AVAILABILITY_STATUS.PENDING:
			return ApplyAvailabilityInput.Available;
		case ENUM_AVAILABILITY_STATUS.AVAILABLE:
			return ApplyAvailabilityInput.Selected;
		case ENUM_AVAILABILITY_STATUS.UNAVAILABLE:
			return ApplyAvailabilityInput.Available;
		case ENUM_AVAILABILITY_STATUS.SELECTED:
			return null;
		default:
			return null;
	}
};
