import { ENUM_USER_ROLES_BACKEND } from "@/entities/staff/types/staff-backend-enum.types";

import type { TAuthAccountBackend } from "../types";

export const MOCK_OPERATOR_ID = "00000000-0000-4000-8000-000000000002";
export const MOCK_AGENCY_ID = "00000000-0000-4000-8000-000000000002";

/** Мок-пользователи: email/пароль → аккаунт из /auth/me */
export const MOCK_AUTH_USERS = [
	{
		password: "String1!",
		account: {
			id: "00000000-0000-4000-a000-000000000001",
			email: "damirk355@gmail.com",
			role: ENUM_USER_ROLES_BACKEND.OPERATOR_ADMIN,
			picture: null,
			agency_id: null,
			operator_id: MOCK_OPERATOR_ID
		}
	},
	{
		password: "String1!",
		account: {
			id: "00000000-0000-4000-a000-000000000002",
			email: "damirk366@gmail.com",
			role: ENUM_USER_ROLES_BACKEND.AGENCY_ADMIN,
			picture: null,
			agency_id: MOCK_AGENCY_ID,
			operator_id: null
		}
	}
] satisfies { password: string; account: TAuthAccountBackend }[];

export const MOCK_AUTH_TOKEN = "mock-jwt-token";
