import { StaffInviteRoleEnum, StaffStatus } from "@/shared/api/generated/Api";

import { ENUM_COMMISSION_OPTIONS } from "@/entities/commission";

import { ENUM_STAFF_ROLE_OPTIONS, ENUM_STAFF_STATUS_OPTIONS } from "../types";

import { STAFF_SEED } from "./staff.seed";

const STAFF_STATUSES = [
	StaffStatus.Active,
	StaffStatus.Active,
	StaffStatus.Pending,
	StaffStatus.Active,
	StaffStatus.Active,
	StaffStatus.Inactive,
	StaffStatus.Active,
	StaffStatus.Pending,
	StaffStatus.Active,
	StaffStatus.Active
] as const;

const STAFF_COMMISSIONS = [
	{ type: ENUM_COMMISSION_OPTIONS.PERCENTAGE, split: 10 },
	{ type: ENUM_COMMISSION_OPTIONS.FIXED, split: 5 },
	{ type: ENUM_COMMISSION_OPTIONS.PARTNER, split: null },
	{ type: ENUM_COMMISSION_OPTIONS.PERCENTAGE, split: 8 },
	{ type: ENUM_COMMISSION_OPTIONS.FIXED, split: 12 },
	{ type: ENUM_COMMISSION_OPTIONS.PARTNER, split: null },
	{ type: ENUM_COMMISSION_OPTIONS.PERCENTAGE, split: 15 },
	{ type: ENUM_COMMISSION_OPTIONS.FIXED, split: 10 },
	{ type: ENUM_COMMISSION_OPTIONS.PARTNER, split: null },
	{ type: ENUM_COMMISSION_OPTIONS.PERCENTAGE, split: 7 }
] as const;

const mapInviteRoleToStaffRole = (
	role: StaffInviteRoleEnum
): (typeof ENUM_STAFF_ROLE_OPTIONS)[keyof typeof ENUM_STAFF_ROLE_OPTIONS] =>
	role === StaffInviteRoleEnum.OperatorAccountant
		? ENUM_STAFF_ROLE_OPTIONS.ACCOUNTANT
		: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER;

const mapApiStatusToStaffStatus = (
	status: StaffStatus
): (typeof ENUM_STAFF_STATUS_OPTIONS)[keyof typeof ENUM_STAFF_STATUS_OPTIONS] => {
	switch (status) {
		case StaffStatus.Active:
			return ENUM_STAFF_STATUS_OPTIONS.ACTIVE;
		case StaffStatus.Inactive:
			return ENUM_STAFF_STATUS_OPTIONS.INACTIVE;
		default:
			return ENUM_STAFF_STATUS_OPTIONS.PENDING;
	}
};

export const STAFF_MOCK = STAFF_SEED.map((staff, index) => ({
	id: String(index + 1),
	first_name: staff.first_name,
	last_name: staff.last_name,
	email: staff.email,
	role: mapInviteRoleToStaffRole(staff.role),
	status: mapApiStatusToStaffStatus(STAFF_STATUSES[index]!),
	type: STAFF_COMMISSIONS[index]!.type,
	split: STAFF_COMMISSIONS[index]!.split
}));
