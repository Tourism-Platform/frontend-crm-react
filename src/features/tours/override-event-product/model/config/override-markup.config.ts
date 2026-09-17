import {
	ENUM_FLIGHT_MARKUP_TYP,
	type IFlightPriceRowMarkup
} from "@/entities/tour";

export const OVERRIDE_MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_FLIGHT_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_FLIGHT_MARKUP_TYP.PERCENTAGE }
] as const;

export const createEmptyOverrideMarkup = (): IFlightPriceRowMarkup => ({
	typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
	value: ""
});

export const OVERRIDE_MARKUP_FIELD = {
	key: "markup",
	label: "override_product.dialog.fields.markup.value.label",
	placeholder: "override_product.dialog.fields.markup.value.placeholder",
	selectOptions: OVERRIDE_MARKUP_TYPE_OPTIONS
} as const;
