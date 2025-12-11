import type { ENUM_STAFF_STATUS_OPTIONS_TYPE } from "./staff-option.types";
import type { ENUM_STAFF_ROLE_OPTIONS_TYPE } from "./staff-role.types";

export interface IStaffUser {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	role: ENUM_STAFF_ROLE_OPTIONS_TYPE;
	status: ENUM_STAFF_STATUS_OPTIONS_TYPE;
	split: number | null;
}
