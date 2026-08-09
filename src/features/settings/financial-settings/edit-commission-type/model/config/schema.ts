import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_EDIT_COMMISSION_TYPE } from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

export const EDIT_COMMISSION_TYPE_SCHEMA = z.object({
	[ENUM_FORM_EDIT_COMMISSION_TYPE.FROM_CURRENCY]: z.enum(
		ENUM_CURRENCY_OPTIONS
	),
	[ENUM_FORM_EDIT_COMMISSION_TYPE.TO_CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_EDIT_COMMISSION_TYPE.RATE]: z
		.number({
			message: msg(
				"currency.commission_type.form.fields.rate.errors.required"
			)
		})
		.min(0.000001, {
			message: msg("currency.commission_type.form.fields.rate.errors.min")
		})
});
