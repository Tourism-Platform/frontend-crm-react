import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useValueToTranslateLabel } from "@/shared/utils";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";
import { useAcceptedCurrencyOptions } from "@/entities/finance";
import {
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	GUIDE_ANY_LANGUAGE,
	GUIDE_CHARGE_LABELS,
	LANGUAGES_LABELS
} from "@/entities/tour";

import type { TGuidePricingFormField } from "../types";

export const GUIDE_PRICING_HEADER_FIELDS_LIST =
	(): TGuidePricingFormField[] => [
		{
			key: ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP,
			label: "form.pricing.form.matrix.fields.charge_typ.label",
			placeholder:
				"form.pricing.form.matrix.fields.charge_typ.placeholder",
			fieldType: "select",
			options: useValueToTranslateLabel(GUIDE_CHARGE_LABELS)
		},
		{
			key: ENUM_GUIDE_PRICING_FIELD.CURRENCY,
			label: "form.pricing.form.matrix.fields.currency.label",
			placeholder: "form.pricing.form.matrix.fields.currency.placeholder",
			fieldType: "select",
			options: useAcceptedCurrencyOptions().currencyOptions,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

/** «Any language» first: the `lang: null` fallback price. */
export const GUIDE_PRICE_LANG_FIELD = (): Extract<
	TGuidePricingFormField,
	{ fieldType: "select" }
> => {
	const { t } = useTranslation("guide_edit_page");
	const languages = useValueToTranslateLabel(LANGUAGES_LABELS);
	const options = useMemo(
		() => [
			{
				label: t("form.pricing.form.matrix.fields.lang.any"),
				value: GUIDE_ANY_LANGUAGE
			},
			...languages
		],
		[languages, t]
	);

	return {
		key: ENUM_GUIDE_PRICE_ROW_FIELD.LANG,
		label: "form.pricing.form.matrix.fields.lang.label",
		placeholder: "form.pricing.form.matrix.fields.lang.placeholder",
		fieldType: "select",
		options
	};
};

export const GUIDE_PRICE_BOUND_FIELD: TGuidePricingFormField = {
	key: ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX,
	label: "form.pricing.form.matrix.fields.up_to_pax.label",
	placeholder: "form.pricing.form.matrix.fields.up_to_pax.placeholder",
	fieldType: "input",
	type: "number",
	min: 1,
	step: "1"
};

export const GUIDE_PRICE_COST_FIELD: TGuidePricingFormField = {
	key: ENUM_GUIDE_PRICE_ROW_FIELD.COSTS,
	label: "form.pricing.form.matrix.fields.cost.label",
	placeholder: "form.pricing.form.matrix.fields.cost.placeholder",
	fieldType: "input",
	type: "number",
	min: 0
};
