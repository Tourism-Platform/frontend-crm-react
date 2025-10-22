import { ACCOMMODATION_AMENITIES_OPTIONS } from "@/shared/config";

import { ENUM_FORM_ACCOMMODATION, type TFormAccommodation } from "../types";

export const ACCOMMODATION_DETAILS_LIST: TFormAccommodation[] = [
	{
		label: "general.accommodation.form.fields.amenities.label",
		placeholder: "general.accommodation.form.fields.amenities.placeholder",
		key: ENUM_FORM_ACCOMMODATION.AMENITIES,
		fieldType: "select",
		options: ACCOMMODATION_AMENITIES_OPTIONS
	},
	{
		label: "general.accommodation.form.fields.description.label",
		placeholder:
			"general.accommodation.form.fields.description.placeholder",
		key: ENUM_FORM_ACCOMMODATION.DESCRIPTION,
		fieldType: "textarea"
	}
];
