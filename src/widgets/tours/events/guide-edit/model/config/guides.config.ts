import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_FORM_GUIDES, GUIDE_TYPE_LABELS } from "@/entities/tour";

import type { TForm } from "../types";

export const GUIDES_DATA_LIST = (): TForm[] => [
	{
		label: "form.guides.details.form.fields.guide_type.label",
		placeholder: "form.guides.details.form.fields.guide_type.placeholder",
		key: ENUM_FORM_GUIDES.GUIDE_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(GUIDE_TYPE_LABELS)
	},
	{
		label: "form.guides.details.form.fields.duration_days.label",
		placeholder:
			"form.guides.details.form.fields.duration_days.placeholder",
		key: ENUM_FORM_GUIDES.DURATION_DAYS,
		fieldType: "input",
		type: "number",
		min: 0.1,
		step: "0.1"
	}
];
