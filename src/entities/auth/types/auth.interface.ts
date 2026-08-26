import type { ENUM_USER_ROLE_TYPE } from "@/shared/config";

export interface IAuthUser {
	email: string;
	password: string;
}

export interface IAuthAccount {
	id: string;
	email: string;
	role: ENUM_USER_ROLE_TYPE | null;
	picture: string | null;
	agency_id: string | null;
	operator_id: string | null;
}
