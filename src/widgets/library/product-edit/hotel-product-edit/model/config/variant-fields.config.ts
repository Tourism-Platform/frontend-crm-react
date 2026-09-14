import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	ENUM_FORM_HOTEL_VARIANT_ROOM as ENUM_ROOM,
	ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON as ENUM_SEASON,
	HOTEL_ROOM_CHARGE_LABELS,
	HOTEL_ROOM_TYPE_LABELS
} from "@/entities/supplier";

import type {
	TVariantForm,
	TVariantRoomForm,
	TVariantRoomSeasonForm
} from "../types";

export const HOTEL_VARIANT_NAME_FIELD: TVariantForm = {
	key: ENUM_FORM.NAME,
	fieldType: "input",
	label: "form.variants.fields.name.label",
	placeholder: "form.variants.fields.name.placeholder"
};

export const HOTEL_VARIANT_ROOM_TYPE_FIELDS_LIST = (): TVariantRoomForm[] => [
	{
		key: ENUM_ROOM.TYP,
		fieldType: "select",
		options: useValueToTranslateLabel(HOTEL_ROOM_TYPE_LABELS),
		label: "form.variants.fields.room_name.label",
		placeholder: "form.variants.fields.room_name.placeholder",
		className: "col-span-6"
	}
];

export const HOTEL_VARIANT_ROOM_PRICING_FIELDS_LIST =
	(): TVariantRoomSeasonForm[] => [
		{
			key: ENUM_SEASON.CHARGE_TYP,
			fieldType: "select",
			options: useValueToTranslateLabel(HOTEL_ROOM_CHARGE_LABELS),
			label: "form.variants.fields.charge_typ.label",
			placeholder: "form.variants.fields.charge_typ.placeholder",
			className: "col-span-2"
		},
		{
			key: ENUM_SEASON.COST,
			fieldType: "input",
			type: "number",
			min: 0,
			step: "any",
			label: "form.variants.fields.cost.label",
			placeholder: "form.variants.fields.cost.placeholder",
			className: "col-span-2"
		},
		{
			key: ENUM_SEASON.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			label: "form.variants.fields.currency.label",
			placeholder: "form.variants.fields.currency.placeholder",
			className: "col-span-2"
		}
	];

export const HOTEL_VARIANT_ROOM_SEASON_DATE_FIELDS_LIST: TVariantRoomSeasonForm[] =
	[
		{
			key: ENUM_SEASON.FROM_DATE,
			fieldType: "input",
			label: "form.variants.fields.from_date.label",
			placeholder: "form.variants.fields.from_date.placeholder",
			className: "col-span-3"
		},
		{
			key: ENUM_SEASON.TO_DATE,
			fieldType: "input",
			label: "form.variants.fields.to_date.label",
			placeholder: "form.variants.fields.to_date.placeholder",
			className: "col-span-3"
		}
	];
