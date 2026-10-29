import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	GUIDE_TYPE_LABELS
} from "@/entities/tour";

import type { TForm } from "../types";

export const GUIDE_DURATION_FIELD: TForm = {
	label: "form.guides.details.form.fields.duration_days.label",
	placeholder: "form.guides.details.form.fields.duration_days.placeholder",
	key: ENUM_FORM_GUIDES.DURATION_DAYS,
	fieldType: "input",
	type: "number",
	min: 0.1,
	step: "0.1"
};

export const GUIDE_TYP_TIER_FIELDS_LIST = (): TForm[] => [
	{
		label: "form.guides.details.typ_tiers.fields.guide_type.label",
		placeholder:
			"form.guides.details.typ_tiers.fields.guide_type.placeholder",
		key: ENUM_FORM_GUIDES.GUIDE_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(GUIDE_TYPE_LABELS)
	},
	{
		label: "form.guides.details.typ_tiers.fields.up_to_pax.label",
		placeholder:
			"form.guides.details.typ_tiers.fields.up_to_pax.placeholder",
		key: ENUM_FORM_GUIDES.UP_TO_PAX,
		fieldType: "input",
		type: "number",
		min: 1,
		step: "1"
	}
];

export const createEmptyGuideTypTier = () => ({
	[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
	[ENUM_FORM_GUIDES.UP_TO_PAX]: null
});
