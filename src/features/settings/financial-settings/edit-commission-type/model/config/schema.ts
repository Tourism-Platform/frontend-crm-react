import { z } from "zod";

import { CURRENCY_LABELS } from "@/entities/commission";

import { ENUM_FORM_EDIT_COMMISSION_TYPE } from "../types";

export const EDIT_COMMISSION_TYPE_SCHEMA = z.object({
	[ENUM_FORM_EDIT_COMMISSION_TYPE.CURRENCY]: z.enum(CURRENCY_LABELS, {
		message: "commission_type.menu.edit.form.errors.currency.required"
	}),
	[ENUM_FORM_EDIT_COMMISSION_TYPE.RATE]: z.number({
		message: "commission_type.menu.edit.form.errors.rate.required"
	})
});
