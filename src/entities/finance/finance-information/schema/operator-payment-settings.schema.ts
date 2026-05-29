import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS,
	ENUM_PAYMENT_ROUTE_METHODS
} from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

const baseSchema = z.object({
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
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.CURRENCY]: z.enum(
		ENUM_CURRENCY_OPTIONS,
		{
			message: msg(
				"payment_settings.form.modal.fields.currency.errors.required"
			)
		}
	),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.NOTE]: z.string().optional()
});

const classicSwiftSchema = z.object({
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE]: z.literal(
		ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT
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
		)
});

const wiseSchema = z.object({
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE]: z.literal(
		ENUM_PAYMENT_ROUTE_METHODS.WISE
	),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_ID_EMAIL]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.account_id_email.errors.required"
			)
		})
		.min(
			1,
			msg(
				"payment_settings.form.modal.fields.account_id_email.errors.min"
			)
		),
	[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.PAYMENT_LINK]: z
		.string({
			message: msg(
				"payment_settings.form.modal.fields.payment_link.errors.required"
			)
		})
		.min(
			1,
			msg("payment_settings.form.modal.fields.payment_link.errors.min")
		)
});

export const OPERATOR_PAYMENT_SETTINGS_SCHEMA = z.discriminatedUnion(
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE,
	[baseSchema.merge(classicSwiftSchema), baseSchema.merge(wiseSchema)]
);

export type TOperatorPayoutDetailsSchema = z.infer<
	typeof OPERATOR_PAYMENT_SETTINGS_SCHEMA
>;
