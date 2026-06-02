import {
	ENUM_TRANSPORTATION_MARKUP_TYP,
	ENUM_TRANSPORTATION_PRICE_ROW_FIELD
} from "@/entities/tour";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_TRANSPORTATION_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_TRANSPORTATION_MARKUP_TYP.PERCENTAGE }
] as const;

export const PER_CAR_MARKUP_FIELD = {
	key: ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP,
	label: "form.pricing.form.per_car.fields.markup.value.label",
	placeholder: "form.pricing.form.per_car.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
