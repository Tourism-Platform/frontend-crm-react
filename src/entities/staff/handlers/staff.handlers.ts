import { HttpResponse } from "msw";

import {
	OPERATOR_STAFF_PATHS,
	PERMISSIONS_PATHS,
	PERMISSION_GROUPS_PATHS,
	createMockHandler,
	getQueryList,
	mockBadRequest,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	toListResponse
} from "@/shared/api";

import { PERMISSION_GROUPS_MOCK } from "../mock/staff.mock";
import {
	createPermissionGroup,
	deletePermissionGroup,
	deleteStaff,
	getStaffPermissions,
	hasStaffEmail,
	inviteStaff,
	listPermissionGroups,
	listStaff,
	replaceStaffAccess,
	updatePermissionGroup,
	updateStaff
} from "../mock/staff.store";
import { ENUM_PERMISSION_BACKEND } from "../types";

const STAFF_NOT_FOUND = "Staff member not found";

const result = (data: unknown, notFound: string) =>
	data ? HttpResponse.json(data) : mockNotFound(notFound);

export const staffHandlers = [
	createMockHandler(OPERATOR_STAFF_PATHS.listStaff, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				listStaff(query.get("q"), getQueryList(query, "statuses")),
				query,
				20
			)
		)
	),

	createMockHandler(OPERATOR_STAFF_PATHS.inviteStaff, ({ body }) => {
		if (!body.email?.trim()) {
			return mockValidationError(["body", "email"], "Field required");
		}
		if (hasStaffEmail(body.email)) {
			return mockBadRequest("User with this email already exists");
		}
		return HttpResponse.json(inviteStaff(body), { status: 201 });
	}),

	createMockHandler(
		OPERATOR_STAFF_PATHS.updateStaffMember(":userId"),
		({ params, body }) =>
			result(updateStaff(String(params.userId), body), STAFF_NOT_FOUND)
	),

	createMockHandler(
		OPERATOR_STAFF_PATHS.deleteStaffMember(":userId"),
		({ params }) =>
			deleteStaff(String(params.userId))
				? mockNoContent()
				: mockNotFound(STAFF_NOT_FOUND)
	),

	createMockHandler(
		OPERATOR_STAFF_PATHS.getStaffMemberPermissions(":userId"),
		({ params }) =>
			result(getStaffPermissions(String(params.userId)), STAFF_NOT_FOUND)
	),

	createMockHandler(
		OPERATOR_STAFF_PATHS.replaceStaffMemberAccess(":userId"),
		({ params, body }) =>
			result(
				replaceStaffAccess(
					String(params.userId),
					body.permissions ?? [],
					body.group_ids ?? []
				),
				STAFF_NOT_FOUND
			)
	),

	createMockHandler(PERMISSIONS_PATHS.getPermissionCatalog, () =>
		HttpResponse.json({
			permissions: Object.values(ENUM_PERMISSION_BACKEND),
			default_groups: PERMISSION_GROUPS_MOCK.map(
				({ name, permissions }) => ({
					name,
					permissions
				})
			)
		})
	),

	createMockHandler(PERMISSION_GROUPS_PATHS.listPermissionGroups, () =>
		HttpResponse.json({ data: listPermissionGroups() })
	),

	createMockHandler(
		PERMISSION_GROUPS_PATHS.createPermissionGroup,
		({ body }) =>
			body.name?.trim()
				? HttpResponse.json(
						createPermissionGroup(
							body.name,
							body.permissions ?? []
						),
						{
							status: 201
						}
					)
				: mockValidationError(["body", "name"], "Field required")
	),

	createMockHandler(
		PERMISSION_GROUPS_PATHS.updatePermissionGroup(":groupId"),
		({ params, body }) =>
			result(
				updatePermissionGroup(
					String(params.groupId),
					body.name,
					body.permissions ?? []
				),
				"Permission group not found"
			)
	),

	createMockHandler(
		PERMISSION_GROUPS_PATHS.deletePermissionGroup(":groupId"),
		({ params }) =>
			deletePermissionGroup(String(params.groupId))
				? mockNoContent()
				: mockNotFound("Permission group not found")
	)
];
