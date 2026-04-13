import type { AuthUserIn, AuthUserModel, MeSchema } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const AUTH_PATHS = {
	getMyAccount: {
		url: "/auth/me",
		method: "GET",
		_types: {} as { body: void; query: void; response: MeSchema }
	} as const,
	changePassword: {
		url: "/auth/password/change",
		method: "PATCH",
		_types: {} as {
			body: void;
			query: { new_password: string };
			response: void;
		}
	} as const,
	authUser: {
		url: "/auth/signin",
		method: "POST",
		_types: {} as { body: AuthUserIn; query: void; response: string }
	} as const,
	logoutUser: {
		url: "/auth/signout",
		method: "POST",
		_types: {} as { body: void; query: void; response: void }
	} as const,
	registerUserAsAdmin: {
		url: "/auth/signup/as/admin",
		method: "POST",
		_types: {} as { body: AuthUserIn; query: void; response: AuthUserModel }
	} as const
} as const;
