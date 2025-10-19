import { z } from "zod";

import type { TLoginPageKeys } from "@/shared/config";
import type { CustomFieldVariant } from "@/shared/ui";

import type { IAuthUser } from "@/entities/auth";

import type { LOGIN_SCHEMA } from "../config";

// import type { CHANGE_PASSWORD_SCHEMA } from "../config";

export interface IFormLogin {
	label: TLoginPageKeys;
	placeholder: TLoginPageKeys;
	key: keyof IAuthUser;
	fieldType: Extract<CustomFieldVariant, "input" | "password">;
	id: string;
}

export const ENUM_FORM_LOGIN = {
	EMAIL: "email",
	PASSWORD: "password",
	LOGIN_TYPE: "login_type"
} as const;

export const ENUM_LOGIN = {
	SIGN_IN: "SIGN_IN",
	SIGN_UP: "SIGN_UP"
} as const;

export type ENUM_LOGIN_TYPE = (typeof ENUM_LOGIN)[keyof typeof ENUM_LOGIN];

export type TLoginSchema = z.infer<typeof LOGIN_SCHEMA>;
