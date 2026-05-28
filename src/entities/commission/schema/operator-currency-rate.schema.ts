import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE
} from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

export const OPERATOR_CURRENCY_RATE_CREATE_SCHEMA = z
	.object({
		[ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.FROM_CURRENCY]: z.enum(
			ENUM_CURRENCY_OPTIONS,
			{
				message: msg(
					"currency.currency_rate.form.fields.from_currency.errors.required"
				)
			}
		),
		[ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.TO_CURRENCY]: z.enum(
			ENUM_CURRENCY_OPTIONS,
			{
				message: msg(
					"currency.currency_rate.form.fields.to_currency.errors.required"
				)
			}
		),
		[ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.RATE]: z
			.number({
				message: msg(
					"currency.currency_rate.form.fields.rate.errors.required"
				)
			})
			.min(
				0.000001,
				msg("currency.currency_rate.form.fields.rate.errors.min")
			)
			.max(
				1_000_000,
				msg("currency.currency_rate.form.fields.rate.errors.max")
			)
	})
	.superRefine((data, ctx) => {
		if (!data.from_currency || !data.to_currency) return;

		if (data.from_currency === data.to_currency) {
			ctx.addIssue({
				path: [ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.TO_CURRENCY],
				code: "custom",
				message: msg(
					"currency.currency_rate.form.fields.to_currency.errors.same_currency"
				)
			});
		}
	});
