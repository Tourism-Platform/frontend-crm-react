import { ENUM_FORM_LANDING, type TLandingForm } from "../types/landing.types";

export const LANDING_DATA_LIST: TLandingForm[] = [
	{
		label: "landing_page.form.fields.description.label",
		placeholder: "landing_page.form.fields.description.placeholder",
		key: ENUM_FORM_LANDING.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-4"
	},
	{
		label: "landing_page.form.fields.pickup_description.label",
		placeholder: "landing_page.form.fields.pickup_description.placeholder",
		key: ENUM_FORM_LANDING.PICKUP_DESCRIPTION,
		fieldType: "input",
		className: "col-span-4"
	},
	{
		label: "landing_page.form.fields.cancellation_policy.label",
		placeholder: "landing_page.form.fields.cancellation_policy.placeholder",
		key: ENUM_FORM_LANDING.CANCELLATION_POLICY,
		fieldType: "editor",
		className: "col-span-4"
	},
	{
		label: "landing_page.form.fields.additional_info.label",
		placeholder: "landing_page.form.fields.additional_info.placeholder",
		key: ENUM_FORM_LANDING.ADDITIONAL_INFO,
		fieldType: "editor",
		className: "col-span-4"
	}
];

export const LANGUAGES_OPTIONS = [
	{ value: "english", label: "English" },
	{ value: "russian", label: "Russian" },
	{ value: "spanish", label: "Spanish" },
	{ value: "italian", label: "Italian" },
	{ value: "french", label: "French" },
	{ value: "chinese", label: "Chinese" },
	{ value: "japanese", label: "Japanese" },
	{ value: "uzbek", label: "Uzbek" },
	{ value: "portuguese", label: "Portuguese" }
];
