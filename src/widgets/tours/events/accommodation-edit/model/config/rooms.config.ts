import { ENUM_FORM_ROOM, type TFormAccommodation } from "../types";

export const ROOM_DATA_LIST: TFormAccommodation[] = [
	{
		label: "rooms.form.fields.name.label",
		placeholder: "rooms.form.fields.name.placeholder",
		key: ENUM_FORM_ROOM.NAME,
		fieldType: "input"
	},
	{
		label: "rooms.form.fields.details.label",
		placeholder: "rooms.form.fields.details.placeholder",
		key: ENUM_FORM_ROOM.DETAILS,
		fieldType: "textarea"
	}
];
