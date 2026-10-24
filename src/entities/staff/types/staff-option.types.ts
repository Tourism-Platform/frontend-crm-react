import { StaffStatus, StaffUpdateStatusEnum } from "@/shared/api";

export const ENUM_STAFF_STATUS_OPTIONS = {
	ACTIVE: "active",
	INACTIVE: "inactive",
	PENDING: "pending"
} as const;

export type ENUM_STAFF_STATUS_OPTIONS_TYPE =
	(typeof ENUM_STAFF_STATUS_OPTIONS)[keyof typeof ENUM_STAFF_STATUS_OPTIONS];

export const ENUM_STAFF_STATUS_BACKEND = {
	PENDING: StaffStatus.Pending,
	ACTIVE: StaffStatus.Active,
	INACTIVE: StaffStatus.Inactive
} as const;

export type ENUM_STAFF_STATUS_BACKEND_TYPE = StaffStatus;

export const ENUM_STAFF_UPDATE_STATUS_BACKEND = {
	ACTIVE: StaffUpdateStatusEnum.Active,
	INACTIVE: StaffUpdateStatusEnum.Inactive
} as const;

export type ENUM_STAFF_UPDATE_STATUS_BACKEND_TYPE = StaffUpdateStatusEnum;
