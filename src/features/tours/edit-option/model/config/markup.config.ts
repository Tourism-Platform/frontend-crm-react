import { useAcceptedCurrencyOptions } from "@/entities/finance";
import {
	ENUM_FORM_TOUR_OPTION,
	ENUM_PACKAGE_MARKUP_TYP
} from "@/entities/tour";

import type { TForm } from "../types";

export const OPTION_MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_PACKAGE_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE }
] as const;

export const OPTION_MARKUP_FIELD = {
	key: ENUM_FORM_TOUR_OPTION.MARKUP,
	label: "option.form.modal.fields.markup.label",
	placeholder: "option.form.modal.fields.markup.placeholder",
	selectOptions: OPTION_MARKUP_TYPE_OPTIONS
} as const;

export const OPTION_MARKUP_CURRENCY_FIELD = (): TForm => ({
	key: ENUM_FORM_TOUR_OPTION.MARKUP_CURRENCY,
	label: "option.form.modal.fields.markupCurrency.label",
	placeholder: "option.form.modal.fields.markupCurrency.placeholder",
	fieldType: "select",
	options: useAcceptedCurrencyOptions().currencyOptions
});
