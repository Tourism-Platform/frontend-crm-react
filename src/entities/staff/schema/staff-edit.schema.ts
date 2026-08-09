import { z } from "zod";

import { type TStaffInformationPageKeys, i18nKey } from "@/shared/config";

import { ENUM_COMMISSION_OPTIONS } from "@/entities/commission";

import {
	ENUM_FORM_EDIT_STAFF,
	ENUM_STAFF_ROLE_OPTIONS,
	ENUM_STAFF_STATUS_OPTIONS
} from "../types";

const msg = i18nKey<TStaffInformationPageKeys>();

export const EDIT_STAFF_SCHEMA = z.object({
	[ENUM_FORM_EDIT_STAFF.FIRST_NAME]: z
		.string({
			message: msg("menu.edit.form.details.errors.firstName.required")
		})
		.trim()
		.min(1, msg("menu.edit.form.details.errors.firstName.required"))
		.max(100, msg("menu.edit.form.details.errors.firstName.max")),
	[ENUM_FORM_EDIT_STAFF.LAST_NAME]: z
		.string({
			message: msg("menu.edit.form.details.errors.lastName.required")
		})
		.trim()
		.min(1, msg("menu.edit.form.details.errors.lastName.required"))
		.max(100, msg("menu.edit.form.details.errors.lastName.max")),
	[ENUM_FORM_EDIT_STAFF.EMAIL]: z
		.email(msg("menu.edit.form.details.errors.email.invalid"))
		.min(1, msg("menu.edit.form.details.errors.email.min")),
	[ENUM_FORM_EDIT_STAFF.ROLE]: z.enum(ENUM_STAFF_ROLE_OPTIONS, {
		message: msg("menu.edit.form.details.errors.role.required")
	}),
	[ENUM_FORM_EDIT_STAFF.STATUS]: z.enum(ENUM_STAFF_STATUS_OPTIONS, {
		message: msg("menu.edit.form.details.errors.status.required")
	}),
	[ENUM_FORM_EDIT_STAFF.TYPE]: z.enum(ENUM_COMMISSION_OPTIONS, {
		message: msg("menu.edit.form.commission.errors.type.required")
	}),
	[ENUM_FORM_EDIT_STAFF.SPLIT]: z
		.number({
			message: msg("menu.edit.form.commission.errors.split.required")
		})
		.min(0, msg("menu.edit.form.commission.errors.split.min"))
		.max(100, msg("menu.edit.form.commission.errors.split.max"))
});
