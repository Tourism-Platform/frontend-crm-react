import type {
	AuthUserIn,
	AuthUserModel,
	UpdateUserSchema,
	UserRoles
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const ADMIN_PATHS = {
	getAllUsers: {
		url: "/admin/user/all",
		method: "GET",
		_types: {} as { body: void; query: void; response: AuthUserModel[] }
	} as const,
	getUser: (id: string) =>
		({
			url: `/admin/user/${id}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: AuthUserModel }
		}) as const,
	updateUser: (id: string) =>
		({
			url: `/admin/user/${id}`,
			method: "PATCH",
			_types: {} as {
				body: UpdateUserSchema;
				query: void;
				response: AuthUserModel;
			}
		}) as const,
	deleteUser: (id: string) =>
		({
			url: `/admin/user/${id}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	createUser: {
		url: "/admin/user",
		method: "POST",
		_types: {} as {
			body: AuthUserIn;
			query: { role?: UserRoles };
			response: AuthUserModel;
		}
	} as const
} as const;
