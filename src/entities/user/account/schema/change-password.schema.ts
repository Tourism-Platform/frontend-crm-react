import { z } from "zod";

import { type TSecurityPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_CHANGE_PASSWORD } from "../types";

const msg = i18nKey<TSecurityPageKeys>();

export const CHANGE_PASSWORD_SCHEMA = z
	.object({
		[ENUM_FORM_CHANGE_PASSWORD.CURRENT_PASSWORD]: z
			.string()
			.min(1, { message: msg("form.errors.current_password.required") })
			.min(6, { message: msg("form.errors.current_password.min") })
			.max(50, { message: msg("form.errors.current_password.max") }),
		[ENUM_FORM_CHANGE_PASSWORD.NEW_PASSWORD]: z
			.string()
			.min(1, { message: msg("form.errors.new_password.required") })
			.min(8, { message: msg("form.errors.new_password.min") })
			.max(50, { message: msg("form.errors.new_password.max") })
			.regex(/[A-Z]/, {
				message: msg("form.errors.new_password.uppercase")
			})
			.regex(/[a-z]/, {
				message: msg("form.errors.new_password.lowercase")
			})
			.regex(/[0-9]/, { message: msg("form.errors.new_password.number") })
			.regex(/[@$!%*?&#]/, {
				message: msg("form.errors.new_password.special")
			}),
		[ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD]: z
			.string()
			.min(1, { message: msg("form.errors.confirm_password.required") })
			.max(50, { message: msg("form.errors.confirm_password.max") })
	})
	.refine(
		(data) =>
			data[ENUM_FORM_CHANGE_PASSWORD.NEW_PASSWORD] ===
			data[ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD],
		{
			path: [ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD],
			message: msg("form.errors.confirm_password.mismatch")
		}
	);
