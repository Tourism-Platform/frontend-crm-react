import { ENUM_FORM_LANDING } from "@/entities/tour";

import type { TForm } from "../types";

export const OVERVIEW_INFO_LIST: TForm[] = [
	{
		key: ENUM_FORM_LANDING.TITLE,
		label: "form.overview.fields.title.label",
		placeholder: "form.overview.fields.title.placeholder",
		fieldType: "input"
	},
	{
		key: ENUM_FORM_LANDING.DESCRIPTION,
		label: "form.overview.fields.description.label",
		fieldType: "editor"
	},
	{
		key: ENUM_FORM_LANDING.OVERVIEW,
		label: "form.overview.fields.overview.label",
		fieldType: "editor"
	},
	{
		key: ENUM_FORM_LANDING.OVERVIEW_DESCRIPTION,
		label: "form.overview.fields.overview_description.label",
		fieldType: "editor"
	}
];
