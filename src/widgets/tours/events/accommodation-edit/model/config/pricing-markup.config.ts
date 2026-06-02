import {
	ENUM_ACCOMMODATION_MARKUP_TYP,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD
} from "@/entities/tour";

export const MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_ACCOMMODATION_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_ACCOMMODATION_MARKUP_TYP.PERCENTAGE }
] as const;

export const PER_ROOM_MARKUP_FIELD = {
	key: ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP,
	label: "form.pricing.form.per_room.fields.markup.value.label",
	placeholder: "form.pricing.form.per_room.fields.markup.value.placeholder",
	selectOptions: MARKUP_TYPE_OPTIONS
} as const;
