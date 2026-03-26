import { HttpResponse } from "msw";

import { AUTH_PATHS, createMockHandler } from "@/shared/api";

import { type IAuthUser } from "../types";

export const MOCK_AUTH_CREDENTIALS = {
	EMAIL: "damirk355@gmail.com",
	PASSWORD: "String1!",
	TOKEN: "mock-jwt-token"
} as const;

export const authHandlers = [
	// Обработчик входа (Signin)
	createMockHandler<IAuthUser>(AUTH_PATHS.authUser, async ({ body }) => {
		const isValid =
			body.email === MOCK_AUTH_CREDENTIALS.EMAIL &&
			body.password === MOCK_AUTH_CREDENTIALS.PASSWORD;

		if (isValid) {
			return HttpResponse.json(MOCK_AUTH_CREDENTIALS.TOKEN, {
				status: 200
			});
		}

		return new HttpResponse(null, {
			status: 401,
			statusText: "Unauthorized"
		});
	}),

	// Обработчик регистрации (Signup)
	createMockHandler<IAuthUser>(AUTH_PATHS.registerUser, async ({ body }) => {
		// Если такой пользователь уже есть в нашей моковой базе
		if (body.email === MOCK_AUTH_CREDENTIALS.EMAIL) {
			return new HttpResponse(null, {
				status: 409,
				statusText: "Conflict"
			});
		}

		return HttpResponse.json({ email: body.email }, { status: 200 });
	})
];
