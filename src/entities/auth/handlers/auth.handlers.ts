import { HttpResponse } from "msw";

import {
	AUTH_PATHS,
	createMockHandler,
	mockBadRequest,
	mockNoContent,
	mockUnauthorized
} from "@/shared/api";

import {
	MOCK_AUTH_TOKEN,
	changeMockPassword,
	getMockSessionAccount,
	signInMockUser,
	signOutMockUser
} from "../mock";

export const authHandlers = [
	createMockHandler(AUTH_PATHS.authUser, ({ body }) => {
		const account = signInMockUser(body.email, body.password);
		return account
			? HttpResponse.json(MOCK_AUTH_TOKEN)
			: mockUnauthorized();
	}),

	createMockHandler(AUTH_PATHS.getMyAccount, () => {
		const account = getMockSessionAccount();
		return account ? HttpResponse.json(account) : mockUnauthorized();
	}),

	createMockHandler(AUTH_PATHS.logoutUser, () => {
		signOutMockUser();
		return mockNoContent();
	}),

	createMockHandler(AUTH_PATHS.changePassword, ({ body }) => {
		if (!getMockSessionAccount()) return mockUnauthorized();

		return changeMockPassword(body.current_password, body.new_password)
			? mockNoContent()
			: mockBadRequest("Current password is incorrect");
	}),

	// Google OAuth в моке недоступен: сразу возвращаем на главную
	createMockHandler(
		AUTH_PATHS.googleLogin,
		() =>
			new HttpResponse(null, { status: 302, headers: { Location: "/" } })
	)
];
