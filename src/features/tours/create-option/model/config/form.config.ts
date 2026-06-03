import { ENUM_FORM_TOUR_OPTION } from "@/entities/tour";

import type { TForm } from "../types";

export const FORM_NEW_OPTION_LIST: TForm[] = [
	{
		label: "option.form.modal.fields.name.label",
		placeholder: "option.form.modal.fields.name.placeholder",
		key: ENUM_FORM_TOUR_OPTION.NAME,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "option.form.modal.fields.description.label",
		placeholder: "option.form.modal.fields.description.placeholder",
		key: ENUM_FORM_TOUR_OPTION.DESCRIPTION,
		fieldType: "textarea",
		className: "col-span-2"
	}
];
