import { StaffStatus, StaffUpdateStatusEnum } from "@/shared/api/generated/Api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_STAFF_STATUS_OPTIONS,
	type ENUM_STAFF_STATUS_OPTIONS_TYPE
} from "../types";

const MAP_STAFF_STATUS_READ: Record<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	StaffStatus
> = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: StaffStatus.Active,
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: StaffStatus.Inactive,
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: StaffStatus.Pending
};
export const staffStatusReadConverter = createEnumMapper<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	StaffStatus
>(MAP_STAFF_STATUS_READ);

const MAP_STAFF_STATUS_UPDATE: Record<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	StaffUpdateStatusEnum
> = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: StaffUpdateStatusEnum.Active,
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: StaffUpdateStatusEnum.Inactive,
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: StaffUpdateStatusEnum.Inactive
};
export const staffStatusUpdateConverter = createEnumMapper<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	StaffUpdateStatusEnum
>(MAP_STAFF_STATUS_UPDATE);
