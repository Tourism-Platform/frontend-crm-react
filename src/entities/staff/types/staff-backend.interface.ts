import type { ENUM_STAFF_STATUS_OPTIONS_TYPE } from "./staff-option.types";
import type { ENUM_STAFF_ROLE_OPTIONS_TYPE } from "./staff-role.types";

export interface IStaffBackend {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	role: ENUM_STAFF_ROLE_OPTIONS_TYPE;
	status: ENUM_STAFF_STATUS_OPTIONS_TYPE;
	type: string;
	split: number | null;
}
