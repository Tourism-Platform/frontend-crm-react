import { ACCOMMODATION_AMENITIES_OPTIONS } from "@/shared/config";

import { ENUM_FORM_ACCOMMODATION } from "@/entities/tour";

import { type TForm } from "../types";

export const ACCOMMODATION_DETAILS_LIST: TForm[] = [
	{
		label: "form.general.details.form.fields.amenities.label",
		placeholder: "form.general.details.form.fields.amenities.placeholder",
		key: ENUM_FORM_ACCOMMODATION.AMENITIES,
		fieldType: "select",
		options: ACCOMMODATION_AMENITIES_OPTIONS,
		className: "col-span-1"
	},
	{
		label: "form.general.details.form.fields.description.label",
		placeholder: "form.general.details.form.fields.description.placeholder",
		key: ENUM_FORM_ACCOMMODATION.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];
