import {
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_FIELD
} from "@/entities/supplier";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_SUPPLIER_SURCHARGE.FIXED },
	{ label: "%", value: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE }
] as const;

export const PER_FARE_MARKUP_FIELD = {
	key: ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP,
	label: "form.pricing.form.per_fare.fields.markup.value.label",
	placeholder: "form.pricing.form.per_fare.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;

export const createEmptyPricingMarkup = () => ({
	typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
	value: ""
});

export const PRICING_MARKUP_FIELD = {
	key: ENUM_TRAIN_PRODUCT_PRICING_FIELD.MARKUP,
	label: "form.pricing.form.per_fare.fields.markup.value.label",
	placeholder: "form.pricing.form.per_fare.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
