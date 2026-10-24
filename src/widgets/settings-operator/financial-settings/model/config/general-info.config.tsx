import type { TFinancialSettingsPageOperatorKeys } from "@/shared/config";
import type { Option, SelectPickerOption } from "@/shared/ui";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_FORM_OPERATOR_GENERAL_INFO } from "@/entities/finance";

import type { TForm } from "../types";

// Мультиселект ждёт Option с индексной сигнатурой
const ACCEPTED_CURRENCY_OPTIONS: Option[] = CURRENCY_OPTIONS.map(
	({ label, value }) => ({ label, value })
);

/** currencyOptions — валюты, выбранные в accepted_currencies */
export const GENERAL_INFO_LIST = (
	currencyOptions: SelectPickerOption[]
): TForm[] => [
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.TOUR_MARGIN,
		label: "general.form.fields.default_tour_margin.label",
		placeholder: "general.form.fields.default_tour_margin.placeholder",
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	},
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.STAFF_PAYOUTS,
		label: "general.form.fields.staff_payouts.label",
		placeholder: "general.form.fields.staff_payouts.placeholder",
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	},
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.ACCEPTED_CURRENCIES,
		label: "general.form.fields.accepted_currencies.label",
		placeholder: "general.form.fields.accepted_currencies.placeholder",
		fieldType: "multiselect",
		options: ACCEPTED_CURRENCY_OPTIONS
	},
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.DEFAULT_CURRENCY,
		label: "general.form.fields.default_currency.label",
		placeholder: "general.form.fields.default_currency.placeholder",
		fieldType: "select",
		options: currencyOptions
	},
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.FX_MARGIN,
		label: "general.form.fields.fx_margin.label",
		placeholder: "general.form.fields.fx_margin.placeholder",
		fieldType: "input",
		type: "number",
		// Конвертер хранит долю с 4 знаками — в процентах это сотые
		step: "0.01",
		min: 0,
		max: 99.99
	}
];

/** Подсказка под полем — только для части полей */
export const GENERAL_INFO_SECTION_DESCRIPTIONS: Partial<
	Record<TForm["key"], TFinancialSettingsPageOperatorKeys>
> = {
	[ENUM_FORM_OPERATOR_GENERAL_INFO.TOUR_MARGIN]:
		"general.form.fields.default_tour_margin.description",
	[ENUM_FORM_OPERATOR_GENERAL_INFO.STAFF_PAYOUTS]:
		"general.form.fields.staff_payouts.description",
	[ENUM_FORM_OPERATOR_GENERAL_INFO.ACCEPTED_CURRENCIES]:
		"general.form.fields.accepted_currencies.description",
	[ENUM_FORM_OPERATOR_GENERAL_INFO.DEFAULT_CURRENCY]:
		"general.form.fields.default_currency.description",
	[ENUM_FORM_OPERATOR_GENERAL_INFO.FX_MARGIN]:
		"general.form.fields.fx_margin.description"
};
