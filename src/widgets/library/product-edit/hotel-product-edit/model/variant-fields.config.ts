import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	ENUM_FORM_HOTEL_VARIANT_ROOM as ENUM_ROOM,
	HOTEL_ROOM_CHARGE_LABELS,
	HOTEL_ROOM_TYPE_LABELS
} from "@/entities/supplier";

import type { TVariantForm, TVariantRoomForm } from "./form.types";

export const HOTEL_VARIANT_NAME_FIELD: TVariantForm = {
	key: ENUM_FORM.NAME,
	fieldType: "input",
	label: "form.variants.fields.name.label",
	placeholder: "form.variants.fields.name.placeholder"
};

export const HOTEL_VARIANT_ROOM_FIELDS_LIST = (): TVariantRoomForm[] => {
	const roomTypeOptions = useValueToTranslateLabel(HOTEL_ROOM_TYPE_LABELS);
	const chargeOptions = useValueToTranslateLabel(HOTEL_ROOM_CHARGE_LABELS);

	return [
		{
			key: ENUM_ROOM.TYP,
			fieldType: "select",
			options: roomTypeOptions,
			label: "form.variants.fields.room_name.label",
			placeholder: "form.variants.fields.room_name.placeholder"
		},
		{
			key: ENUM_ROOM.CHARGE_TYP,
			fieldType: "select",
			options: chargeOptions,
			label: "form.variants.fields.charge_typ.label",
			placeholder: "form.variants.fields.charge_typ.placeholder"
		},
		{
			key: ENUM_ROOM.COST,
			fieldType: "input",
			type: "number",
			min: 0,
			step: "any",
			label: "form.variants.fields.cost.label",
			placeholder: "form.variants.fields.cost.placeholder"
		},
		{
			key: ENUM_ROOM.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			label: "form.variants.fields.currency.label",
			placeholder: "form.variants.fields.currency.placeholder"
		},
		{
			key: ENUM_ROOM.FROM_DATE,
			fieldType: "input",
			label: "form.variants.fields.from_date.label",
			placeholder: "form.variants.fields.from_date.placeholder"
		},
		{
			key: ENUM_ROOM.TO_DATE,
			fieldType: "input",
			label: "form.variants.fields.to_date.label",
			placeholder: "form.variants.fields.to_date.placeholder"
		},
		{
			key: ENUM_ROOM.SEASON_CHARGE_TYP,
			fieldType: "select",
			options: chargeOptions,
			label: "form.variants.fields.season_charge_typ.label",
			placeholder: "form.variants.fields.season_charge_typ.placeholder"
		},
		{
			key: ENUM_ROOM.SEASON_COST,
			fieldType: "input",
			type: "number",
			min: 0,
			step: "any",
			label: "form.variants.fields.season_cost.label",
			placeholder: "form.variants.fields.season_cost.placeholder"
		},
		{
			key: ENUM_ROOM.SEASON_CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			label: "form.variants.fields.season_currency.label",
			placeholder: "form.variants.fields.season_currency.placeholder",
			className: "md:col-span-2"
		}
	];
};
