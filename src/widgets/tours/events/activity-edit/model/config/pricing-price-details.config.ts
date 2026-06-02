import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_ACTIVITY_PRICING_FIELD,
	ENUM_ACTIVITY_PRICING_TYPE,
	type ENUM_ACTIVITY_PRICING_TYPE_TYPE
} from "@/entities/tour";

import type { TForm } from "../types";

export const PRICING_PRICE_DETAILS_LIST = (
	pricingType: ENUM_ACTIVITY_PRICING_TYPE_TYPE
): TForm[] => {
	const isPerPerson = pricingType === ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON;

	return [
		{
			label: isPerPerson
				? "form.pricing.form.pricing_details.fields.total_price_per_person.label"
				: "form.pricing.form.pricing_details.fields.total_price.label",
			placeholder: isPerPerson
				? "form.pricing.form.pricing_details.fields.total_price_per_person.placeholder"
				: "form.pricing.form.pricing_details.fields.total_price.placeholder",
			key: ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE,
			type: "number",
			fieldType: "input"
		},
		{
			label: isPerPerson
				? "form.pricing.form.pricing_details.fields.taxes_and_fees_per_person.label"
				: "form.pricing.form.pricing_details.fields.taxes_and_fees.label",
			placeholder: isPerPerson
				? "form.pricing.form.pricing_details.fields.taxes_and_fees_per_person.placeholder"
				: "form.pricing.form.pricing_details.fields.taxes_and_fees.placeholder",
			key: ENUM_ACTIVITY_PRICING_FIELD.TAXES,
			type: "number",
			fieldType: "input"
		},
		{
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			key: ENUM_ACTIVITY_PRICING_FIELD.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS
		}
	];
};
