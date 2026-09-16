import {
	ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD,
	ENUM_HOTEL_PRODUCT_PRICING_FIELD,
	ENUM_SUPPLIER_SURCHARGE
} from "@/entities/supplier";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_SUPPLIER_SURCHARGE.FIXED },
	{ label: "%", value: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE }
] as const;

export const PER_ROOM_MARKUP_FIELD = {
	key: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP,
	label: "form.pricing.form.per_room.fields.markup.value.label",
	placeholder: "form.pricing.form.per_room.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;

export const createEmptyPricingMarkup = () => ({
	typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
	value: ""
});

export const PRICING_MARKUP_FIELD = {
	key: ENUM_HOTEL_PRODUCT_PRICING_FIELD.MARKUP,
	label: "form.pricing.form.per_room.fields.markup.value.label",
	placeholder: "form.pricing.form.per_room.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
