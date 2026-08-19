import { z } from "zod";

import { type TStaffInformationPageKeys, i18nKey } from "@/shared/config";

import { ENUM_PERMISSION } from "../types";
import { ENUM_FORM_INVITE_STAFF } from "../types/staff-invite-form.types";

const msg = i18nKey<TStaffInformationPageKeys>();

export const INVITE_STAFF_SCHEMA = z.object({
	[ENUM_FORM_INVITE_STAFF.FIRST_NAME]: z
		.string({
			message: msg("invite.form.errors.firstName.required")
		})
		.trim()
		.min(1, msg("invite.form.errors.firstName.required"))
		.max(100, msg("invite.form.errors.firstName.max")),
	[ENUM_FORM_INVITE_STAFF.LAST_NAME]: z
		.string({
			message: msg("invite.form.errors.lastName.required")
		})
		.trim()
		.min(1, msg("invite.form.errors.lastName.required"))
		.max(100, msg("invite.form.errors.lastName.max")),
	[ENUM_FORM_INVITE_STAFF.EMAIL]: z
		.email(msg("invite.form.errors.email.invalid"))
		.min(1, msg("invite.form.errors.email.min")),
	[ENUM_FORM_INVITE_STAFF.PERMISSIONS]: z.array(z.enum(ENUM_PERMISSION))
});
