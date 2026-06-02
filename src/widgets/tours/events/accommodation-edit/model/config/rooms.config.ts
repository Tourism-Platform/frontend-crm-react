import { ROOM_NAME_OPTIONS } from "@/shared/config";

import { ENUM_FORM_ROOMS } from "@/entities/tour";

import type { TForm } from "../types";

export const ROOM_DATA_LIST: TForm[] = [
	{
		label: "form.rooms.details.form.fields.room_name.label",
		placeholder: "form.rooms.details.form.fields.room_name.placeholder",
		key: ENUM_FORM_ROOMS.ROOM_NAME,
		fieldType: "select",
		options: ROOM_NAME_OPTIONS
	},
	{
		label: "form.rooms.details.form.fields.description.label",
		placeholder: "form.rooms.details.form.fields.description.placeholder",
		key: ENUM_FORM_ROOMS.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];
