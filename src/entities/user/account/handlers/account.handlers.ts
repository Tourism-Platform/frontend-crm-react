import { HttpResponse } from "msw";

import {
	ACCOUNT_PATHS,
	AccountType,
	PROFILE_INFO_PATHS,
	UserRoles,
	createMockHandler,
	mockNoContent,
	mockUnauthorized,
	omitKeys
} from "@/shared/api";

import { getMockSessionAccount } from "@/entities/auth/mock";

import {
	getAccountProfile,
	setAccountPhoto,
	updateAccountProfile
} from "../mock/account.store";

const AGENCY_ROLES: string[] = [UserRoles.AgencyAdmin, UserRoles.AgencyStaff];

/** Профиль вошедшего пользователя; null — нет сессии */
const getSessionProfile = () => {
	const account = getMockSessionAccount();
	if (!account) return null;
	const profile = getAccountProfile(account.id);
	return profile ? { account, profile } : null;
};

export const accountHandlers = [
	createMockHandler(PROFILE_INFO_PATHS.getMyAccount, () => {
		const session = getSessionProfile();
		if (!session) return mockUnauthorized();

		return HttpResponse.json({
			...omitKeys(session.profile, ["id", "user_id"]),
			email: session.account.email
		});
	}),

	createMockHandler(PROFILE_INFO_PATHS.updateMyProfile, ({ body }) => {
		const session = getSessionProfile();
		if (!session) return mockUnauthorized();

		return HttpResponse.json(
			updateAccountProfile(session.account.id, body)
		);
	}),

	createMockHandler(PROFILE_INFO_PATHS.uploadAvatar, () => {
		const session = getSessionProfile();
		if (!session) return mockUnauthorized();

		return HttpResponse.json(setAccountPhoto(session.account.id, true));
	}),

	createMockHandler(PROFILE_INFO_PATHS.deleteAvatar, () => {
		const session = getSessionProfile();
		if (!session) return mockUnauthorized();

		setAccountPhoto(session.account.id, false);
		return mockNoContent();
	}),

	createMockHandler(ACCOUNT_PATHS.getAccountType, () => {
		const account = getMockSessionAccount();
		if (!account) return mockUnauthorized();

		return HttpResponse.json({
			account_type: AGENCY_ROLES.includes(account.role)
				? AccountType.TourAgency
				: AccountType.TourOperator
		});
	})
];
