import type { ENUM_PERMISSION_TYPE } from "./permission.types";

export interface IStaffAccess {
	direct: ENUM_PERMISSION_TYPE[];
	groupIds: string[];
	effective: ENUM_PERMISSION_TYPE[];
}

export interface IStaffAccessForm {
	permissions: ENUM_PERMISSION_TYPE[];
	groupIds: string[];
}

export interface IPermissionGroup {
	id: string;
	name: string;
	permissions: ENUM_PERMISSION_TYPE[];
}
