import {
	StaffInviteRoleEnum,
	StaffReadRoleEnum,
	StaffUpdateRoleEnum
} from "@/shared/api/generated/Api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_STAFF_ROLE_OPTIONS,
	type ENUM_STAFF_ROLE_OPTIONS_TYPE
} from "../types";

const MAP_STAFF_ROLE_READ: Record<
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	StaffReadRoleEnum
> = {
	[ENUM_STAFF_ROLE_OPTIONS.ACCOUNTANT]: StaffReadRoleEnum.OperatorAccountant,
	[ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER]:
		StaffReadRoleEnum.OperatorSalesManager
};
export const staffRoleReadConverter = createEnumMapper<
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	StaffReadRoleEnum
>(MAP_STAFF_ROLE_READ);

const MAP_STAFF_ROLE_INVITE: Record<
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	StaffInviteRoleEnum
> = {
	[ENUM_STAFF_ROLE_OPTIONS.ACCOUNTANT]:
		StaffInviteRoleEnum.OperatorAccountant,
	[ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER]:
		StaffInviteRoleEnum.OperatorSalesManager
};
export const staffRoleInviteConverter = createEnumMapper<
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	StaffInviteRoleEnum
>(MAP_STAFF_ROLE_INVITE);

const MAP_STAFF_ROLE_UPDATE: Record<
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	StaffUpdateRoleEnum
> = {
	[ENUM_STAFF_ROLE_OPTIONS.ACCOUNTANT]:
		StaffUpdateRoleEnum.OperatorAccountant,
	[ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER]:
		StaffUpdateRoleEnum.OperatorSalesManager
};
export const staffRoleUpdateConverter = createEnumMapper<
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	StaffUpdateRoleEnum
>(MAP_STAFF_ROLE_UPDATE);
