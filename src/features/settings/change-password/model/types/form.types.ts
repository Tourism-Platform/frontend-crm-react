import type { TSecurityPageKeys } from "@/shared/config";

export interface IFormChangePassword {
	label: TSecurityPageKeys;
	placeholder: TSecurityPageKeys;
	key: ENUM_FORM_CHANGE_PASSWORD_TYPE;
}

export const ENUM_FORM_CHANGE_PASSWORD = {
	CURRENT_PASSWORD: "current_password",
	NEW_PASSWORD: "new_password",
	CONFIRM_PASSWORD: "confirm_password"
} as const;

export type ENUM_FORM_CHANGE_PASSWORD_TYPE =
	(typeof ENUM_FORM_CHANGE_PASSWORD)[keyof typeof ENUM_FORM_CHANGE_PASSWORD];
