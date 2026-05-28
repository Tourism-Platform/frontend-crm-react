import { OPERATOR_STAFF_PATHS, type StaffRead } from "@/shared/api";

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
