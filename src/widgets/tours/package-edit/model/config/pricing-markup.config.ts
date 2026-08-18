import { ENUM_PACKAGE_FIELD, ENUM_PACKAGE_MARKUP_TYP } from "@/entities/tour";

export const PACKAGE_MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_PACKAGE_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE }
] as const;

export const createEmptyPackageMarkup = () => ({
	typ: ENUM_PACKAGE_MARKUP_TYP.FIXED,
	value: ""
});

export const PACKAGE_MARKUP_FIELD = {
	key: ENUM_PACKAGE_FIELD.MARKUP,
	label: "form.pricing.form.pricing_details.fields.markup.value.label",
	placeholder:
		"form.pricing.form.pricing_details.fields.markup.value.placeholder",
	selectOptions: PACKAGE_MARKUP_TYPE_OPTIONS
} as const;
