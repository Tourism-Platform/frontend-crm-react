import { ENUM_FORM_ROOMS } from "@/entities/tour";

import { type TForm } from "../types";

export const ROOM_DATA_LIST: TForm[] = [
	{
		label: "form.rooms.details.form.fields.name.label",
		placeholder: "form.rooms.details.form.fields.name.placeholder",
		key: ENUM_FORM_ROOMS.NAME,
		fieldType: "input",
		className: "col-span-1"
	},
	{
		label: "form.rooms.details.form.fields.details.label",
		placeholder: "form.rooms.details.form.fields.details.placeholder",
		key: ENUM_FORM_ROOMS.DETAILS,
		fieldType: "editor",
		className: "col-span-2"
	}
];
