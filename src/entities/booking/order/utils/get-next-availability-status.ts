import { ApplyAvailabilityInput, AvailabilityStatus } from "@/shared/api";

export const getNextAvailabilityApplyStatus = (
	current?: AvailabilityStatus
): ApplyAvailabilityInput | null => {
	switch (current) {
		case undefined:
		case AvailabilityStatus.Pending:
			return ApplyAvailabilityInput.Available;
		case AvailabilityStatus.Available:
			return ApplyAvailabilityInput.Selected;
		case AvailabilityStatus.Unavailable:
			return ApplyAvailabilityInput.Available;
		case AvailabilityStatus.Selected:
			return null;
		default:
			return null;
	}
};
