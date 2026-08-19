import type { PermissionCatalog } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const PERMISSIONS_PATHS = {
	getPermissionCatalog: {
		url: "/auth/permission/catalog",
		method: "GET",
		_types: {} as { body: void; query: void; response: PermissionCatalog }
	} as const
} as const;
