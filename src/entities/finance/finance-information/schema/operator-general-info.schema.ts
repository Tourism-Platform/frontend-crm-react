import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_OPERATOR_GENERAL_INFO } from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

export const OPERATOR_GENERAL_INFO_SCHEMA = z
	.object({
		[ENUM_FORM_OPERATOR_GENERAL_INFO.TOUR_MARGIN]: z
			.number({
				message: msg(
					"general.form.fields.default_tour_margin.errors.required"
				)
			})
			.min(0, msg("general.form.fields.default_tour_margin.errors.min"))
			.max(
				100,
				msg("general.form.fields.default_tour_margin.errors.max")
			),
		[ENUM_FORM_OPERATOR_GENERAL_INFO.STAFF_PAYOUTS]: z
			.number({
				message: msg(
					"general.form.fields.staff_payouts.errors.required"
				)
			})
			.min(0, msg("general.form.fields.staff_payouts.errors.min"))
			.max(100, msg("general.form.fields.staff_payouts.errors.max")),
		[ENUM_FORM_OPERATOR_GENERAL_INFO.ACCEPTED_CURRENCIES]: z
			.array(z.enum(ENUM_CURRENCY_OPTIONS))
			.min(
				1,
				msg("general.form.fields.accepted_currencies.errors.required")
			),
		[ENUM_FORM_OPERATOR_GENERAL_INFO.DEFAULT_CURRENCY]: z.enum(
			ENUM_CURRENCY_OPTIONS,
			{
				message: msg(
					"general.form.fields.default_currency.errors.required"
				)
			}
		),
		// Доля 0 ≤ x < 1 на бэке, в форме — проценты
		[ENUM_FORM_OPERATOR_GENERAL_INFO.FX_MARGIN]: z
			.number({
				message: msg("general.form.fields.fx_margin.errors.required")
			})
			.min(0, msg("general.form.fields.fx_margin.errors.min"))
			.lt(100, msg("general.form.fields.fx_margin.errors.max"))
	})
	// default_currency обязан входить в accepted_currencies, иначе бэк ответит 400
	.refine(
		(data) =>
			data[ENUM_FORM_OPERATOR_GENERAL_INFO.ACCEPTED_CURRENCIES].includes(
				data[ENUM_FORM_OPERATOR_GENERAL_INFO.DEFAULT_CURRENCY]
			),
		{
			message: msg(
				"general.form.fields.default_currency.errors.not_accepted"
			),
			path: [ENUM_FORM_OPERATOR_GENERAL_INFO.DEFAULT_CURRENCY]
		}
	);
