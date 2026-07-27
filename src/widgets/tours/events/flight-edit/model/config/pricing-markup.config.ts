import {
	ENUM_FLIGHT_MARKUP_TYP,
	ENUM_FLIGHT_PRICING_FIELD
} from "@/entities/tour";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_FLIGHT_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_FLIGHT_MARKUP_TYP.PERCENTAGE }
] as const;

export const createEmptyPricingMarkup = () => ({
	typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
	value: ""
});

export const PRICING_MARKUP_FIELD = {
	key: ENUM_FLIGHT_PRICING_FIELD.MARKUP,
	label: "form.pricing.form.pricing_details.fields.markup.value.label",
	placeholder:
		"form.pricing.form.pricing_details.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
