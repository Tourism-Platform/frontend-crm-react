import { TOUR_TYPE_OPTIONS } from "@/shared/config";

import { ENUM_GENERAL_FORM, type TGeneralForm } from "../types";

export const GENERAL_FORM_LIST: TGeneralForm[] = [
	{
		label: "general.form.fields.tourTitle.label",
		placeholder: "general.form.fields.tourTitle.placeholder",
		key: ENUM_GENERAL_FORM.TOUR_TITLE,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.form.fields.tourType.label",
		placeholder: "general.form.fields.tourType.placeholder",
		key: ENUM_GENERAL_FORM.TOUR_TYPE,
		fieldType: "select",
		options: TOUR_TYPE_OPTIONS
	},
	{
		label: "general.form.fields.groupSize.label",
		placeholder: "general.form.fields.groupSize.placeholder",
		key: ENUM_GENERAL_FORM.GROUP_SIZE,
		fieldType: "input",
		type: "number"
	}
];
