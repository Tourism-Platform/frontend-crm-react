import { ENUM_FORM_TRANSPORTATION } from "@/entities/tour";

import { type TForm } from "../types";

export const TRANSPORTATION_DESCRIPTION: TForm = {
	label: "form.general.description.description.label",
	placeholder: "form.general.description.description.placeholder",
	key: ENUM_FORM_TRANSPORTATION.DESCRIPTION,
	fieldType: "editor"
};
