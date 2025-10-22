import { ENUM_FORM_FLIGHT, type TForm } from "../types";

export const FLIGHT_DESCRIPTION: TForm[] = [
	{
		label: "general.description.description.label",
		placeholder: "general.description.description.placeholder",
		key: ENUM_FORM_FLIGHT.DESCRIPTION,
		fieldType: "textarea"
	}
];
