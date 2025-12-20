import { ENUM_FORM_ROOM, type TForm } from "../types";

export const ROOM_DATA_LIST: TForm[] = [
	{
		label: "rooms.form.fields.name.label",
		placeholder: "rooms.form.fields.name.placeholder",
		key: ENUM_FORM_ROOM.NAME,
		fieldType: "input",
		className: "col-span-1"
	},
	{
		label: "rooms.form.fields.details.label",
		placeholder: "rooms.form.fields.details.placeholder",
		key: ENUM_FORM_ROOM.DETAILS,
		fieldType: "editor",
		className: "col-span-2"
	}
];
