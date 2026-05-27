import { ENUM_ROLE } from "@/entities/user";

import type {
	IAuthAccount,
	IAuthUser,
	TAuthAccountBackend,
	TAuthUserBackend
} from "../types";

import { roleMapper } from "./role.converters";

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
	role: roleMapper.from(user?.role || "") || ENUM_ROLE.TOUR_OPERATOR,
	picture: user.picture || null,
	agency_id: user.agency_id || null,
	operator_id: user.operator_id || null
});
