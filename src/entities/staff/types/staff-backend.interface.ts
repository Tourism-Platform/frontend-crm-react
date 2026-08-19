import {
	OPERATOR_STAFF_PATHS,
	PERMISSIONS_PATHS,
	PERMISSION_GROUPS_PATHS,
	type StaffRead
} from "@/shared/api";

export type TListStaffBackendResponse =
	typeof OPERATOR_STAFF_PATHS.listStaff._types.response;

export type TListStaffQuery =
	typeof OPERATOR_STAFF_PATHS.listStaff._types.query;

export type TInviteStaffBackendResponse =
	typeof OPERATOR_STAFF_PATHS.inviteStaff._types.response;

export type TInviteStaffBackendBody =
	typeof OPERATOR_STAFF_PATHS.inviteStaff._types.body;

export type TUpdateStaffBackendResponse = ReturnType<
	typeof OPERATOR_STAFF_PATHS.updateStaffMember
>["_types"]["response"];

export type TUpdateStaffBackendBody = ReturnType<
	typeof OPERATOR_STAFF_PATHS.updateStaffMember
>["_types"]["body"];

export type TStaffReadBackend = StaffRead;

export type TStaffAccessReadBackend = ReturnType<
	typeof OPERATOR_STAFF_PATHS.getStaffMemberPermissions
>["_types"]["response"];

export type TStaffAccessReplaceBackendBody = ReturnType<
	typeof OPERATOR_STAFF_PATHS.replaceStaffMemberAccess
>["_types"]["body"];

export type TPermissionCatalogBackend =
	typeof PERMISSIONS_PATHS.getPermissionCatalog._types.response;

export type TPermissionGroupListBackend =
	typeof PERMISSION_GROUPS_PATHS.listPermissionGroups._types.response;
