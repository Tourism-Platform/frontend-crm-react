import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_FORM_TOUR_OPTION, LANGUAGES_LABELS } from "@/entities/tour";

import type { TForm } from "../types";

export const FORM_EDIT_OPTION_LIST = (): TForm[] => [
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
	},
	{
		label: "option.form.modal.fields.languages.label",
		placeholder: "option.form.modal.fields.languages.placeholder",
		key: ENUM_FORM_TOUR_OPTION.LANGUAGES,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(LANGUAGES_LABELS),
		className: "col-span-2",
		badgeVariant: "secondary"
	}
];
