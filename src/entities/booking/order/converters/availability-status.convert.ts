import { AvailabilityStatus } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_AVAILABILITY_STATUS,
	type ENUM_AVAILABILITY_STATUS_TYPE
} from "../types";

const MAP_AVAILABILITY_STATUS: Partial<
	Record<ENUM_AVAILABILITY_STATUS_TYPE, AvailabilityStatus>
> = {
	[ENUM_AVAILABILITY_STATUS.PENDING]: AvailabilityStatus.Pending,
	[ENUM_AVAILABILITY_STATUS.AVAILABLE]: AvailabilityStatus.Available,
	[ENUM_AVAILABILITY_STATUS.UNAVAILABLE]: AvailabilityStatus.Unavailable,
	[ENUM_AVAILABILITY_STATUS.SELECTED]: AvailabilityStatus.Selected,
	[ENUM_AVAILABILITY_STATUS.DESELECTED]: AvailabilityStatus.Deselected
};

export const availabilityStatusMapper = createEnumMapper<
	ENUM_AVAILABILITY_STATUS_TYPE,
	AvailabilityStatus
>(MAP_AVAILABILITY_STATUS);
