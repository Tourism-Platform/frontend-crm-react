import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_OPERATOR_PAYMENT_SETTINGS } from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

export const OPERATOR_PAYMENT_SETTINGS_SCHEMA = z.object({
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.method_type.errors.required"
			)
		})
		.min(
			1,
			msg("payment_settings.form.modal.fields.method_type.errors.min")
		),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.INTERNAL_LABEL]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.internal_label.errors.required"
			)
		})
		.min(
			1,
			msg("payment_settings.form.modal.fields.internal_label.errors.min")
		),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_NAME_IBAN]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.account_name_iban.errors.required"
			)
		})
		.min(
			1,
			msg(
				"payment_settings.form.modal.fields.account_name_iban.errors.min"
			)
		),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.SWIFT_BIC]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.swift_bic.errors.required"
			)
		})
		.min(1, msg("payment_settings.form.modal.fields.swift_bic.errors.min")),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.CURRENCY]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.currency.errors.required"
			)
		})
		.min(1, msg("payment_settings.form.modal.fields.currency.errors.min")),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_NAME]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.bank_name.errors.required"
			)
		})
		.min(1, msg("payment_settings.form.modal.fields.bank_name.errors.min")),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_ADDRESS]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.bank_address.errors.required"
			)
		})
		.min(
			1,
			msg("payment_settings.form.modal.fields.bank_address.errors.min")
		),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.NOTE]: z.string().optional()
});

export type TOperatorPayoutDetailsSchema = z.infer<
	typeof OPERATOR_PAYMENT_SETTINGS_SCHEMA
>;
