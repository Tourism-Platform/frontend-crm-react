import { userRoleMapper } from "@/shared/converters";

import type { ENUM_USER_ROLES_BACKEND_TYPE } from "@/entities/staff/types/staff-backend-enum.types";

import type {
	IAuthAccount,
	IAuthUser,
	TAuthAccountBackend,
	TAuthUserBackend
} from "../types";

export const mapAuthUserToBackend = (user: IAuthUser): TAuthUserBackend => ({
	email: user.email,
	password: user.password
});

export const mapAuthUserToFrontend = (user: TAuthUserBackend): IAuthUser => ({
	email: user.email,
	password: user.password
});

export const mapAuthAccountToFrontend = (
	user: TAuthAccountBackend
): IAuthAccount => ({
	id: user.id,
	email: user.email,
	role:
		userRoleMapper.from(user.role as ENUM_USER_ROLES_BACKEND_TYPE) || null,
	picture: user.picture || null,
	agency_id: user.agency_id || null,
	operator_id: user.operator_id || null
});
