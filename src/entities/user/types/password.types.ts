import { z } from "zod";

import type { CHANGE_PASSWORD_SCHEMA } from "../schema";

export const ENUM_FORM_CHANGE_PASSWORD = {
	CURRENT_PASSWORD: "currentPassword",
	NEW_PASSWORD: "newPassword",
	CONFIRM_PASSWORD: "confirmPassword"
} as const;

export type ENUM_FORM_CHANGE_PASSWORD_TYPE =
	(typeof ENUM_FORM_CHANGE_PASSWORD)[keyof typeof ENUM_FORM_CHANGE_PASSWORD];

export type TChangePasswordSchema = z.infer<typeof CHANGE_PASSWORD_SCHEMA>;
