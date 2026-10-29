import {
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PRICING_FIELD
} from "@/entities/tour";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_GUIDE_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE }
] as const;

export const GUIDE_MARKUP_FIELD = {
	key: ENUM_GUIDE_PRICING_FIELD.MARKUP,
	label: "form.pricing.form.matrix.fields.markup.value.label",
	placeholder: "form.pricing.form.matrix.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
