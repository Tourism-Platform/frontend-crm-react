import { ENUM_FORM_CREATE_TOUR, type TForm } from "../types";

import { TOUR_TYPE_OPTIONS } from "./tour-types.config";

export const FORM_CREATE_TOUR_LIST: TForm[] = [
	{
		label: "create.form.fields.tourTitle.label",
		placeholder: "create.form.fields.tourTitle.placeholder",
		key: ENUM_FORM_CREATE_TOUR.TOUR_TITLE,
		fieldType: "input"
	},
	{
		label: "create.form.fields.tourType.label",
		placeholder: "create.form.fields.tourType.placeholder",
		key: ENUM_FORM_CREATE_TOUR.TOUR_TYPE,
		fieldType: "select",
		options: TOUR_TYPE_OPTIONS
	},
	{
		label: "create.form.fields.groupSize.label",
		placeholder: "create.form.fields.groupSize.placeholder",
		key: ENUM_FORM_CREATE_TOUR.GROUP_SIZE,
		fieldType: "input",
		type: "number"
	}
];
