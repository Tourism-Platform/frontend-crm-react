import { ENUM_FORM_INFORMATION } from "@/entities/tour";

import { type TForm } from "../types";

export const INFORMATION_DATA_LIST: TForm[] = [
	{
		label: "form.general.info.form.fields.description.label",
		placeholder: "form.general.info.form.fields.description.placeholder",
		key: ENUM_FORM_INFORMATION.DESCRIPTION,
		fieldType: "editor"
	}
];
