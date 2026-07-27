import { ENUM_FORM_FLIGHT } from "@/entities/tour";

import { type TForm } from "../types";

export const FLIGHT_DESCRIPTION: TForm[] = [
	{
		label: "form.general.description.description.label",
		placeholder: "form.general.description.description.placeholder",
		key: ENUM_FORM_FLIGHT.DESCRIPTION,
		fieldType: "editor"
	}
];
