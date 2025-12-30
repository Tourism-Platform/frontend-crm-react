import type { ENUM_STAFF_STATUS_OPTIONS_TYPE } from "./staff-option.types";

export interface IStaffFilters {
	search: string;
	status: ENUM_STAFF_STATUS_OPTIONS_TYPE[];
	page: number;
	limit: number;
}
