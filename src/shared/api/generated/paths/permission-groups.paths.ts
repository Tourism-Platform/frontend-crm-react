import type {
	PermissionGroupCreate,
	PermissionGroupListResponse,
	PermissionGroupRead,
	PermissionGroupUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const PERMISSION_GROUPS_PATHS = {
	listPermissionGroups: {
		url: "/auth/permission/group/all",
		method: "GET",
		_types: {} as {
			body: void;
			query: void;
			response: PermissionGroupListResponse;
		}
	} as const,
	createPermissionGroup: {
		url: "/auth/permission/group",
		method: "POST",
		_types: {} as {
			body: PermissionGroupCreate;
			query: void;
			response: PermissionGroupRead;
		}
	} as const,
	updatePermissionGroup: (groupId: string) =>
		({
			url: `/auth/permission/group/${groupId}`,
			method: "PATCH",
			_types: {} as {
				body: PermissionGroupUpdate;
				query: void;
				response: PermissionGroupRead;
			}
		}) as const,
	deletePermissionGroup: (groupId: string) =>
		({
			url: `/auth/permission/group/${groupId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
