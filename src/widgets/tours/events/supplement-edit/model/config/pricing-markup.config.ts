import {
	ENUM_SUPPLEMENT_MARKUP_TYP,
	ENUM_SUPPLEMENT_PRICE_ROW_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD
} from "@/entities/tour";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_SUPPLEMENT_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_SUPPLEMENT_MARKUP_TYP.PERCENTAGE }
] as const;

export const PER_ITEM_MARKUP_FIELD = {
	key: ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP,
	label: "form.pricing.form.per_item.fields.markup.value.label",
	placeholder: "form.pricing.form.per_item.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;

export const createEmptyPricingMarkup = () => ({
	typ: ENUM_SUPPLEMENT_MARKUP_TYP.FIXED,
	value: ""
});

export const PRICING_MARKUP_FIELD = {
	key: ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP,
	label: "form.pricing.form.per_item.fields.markup.value.label",
	placeholder: "form.pricing.form.per_item.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
