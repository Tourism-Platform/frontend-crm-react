import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_SETTINGS_GENERAL_FORM, TOUR_TYPE_LABELS } from "@/entities/tour";

import { type TGeneralForm } from "../types";

export const GENERAL_FORM_LIST = (): TGeneralForm[] => [
	{
		label: "general.form.fields.tourTitle.label",
		placeholder: "general.form.fields.tourTitle.placeholder",
		key: ENUM_SETTINGS_GENERAL_FORM.TOUR_TITLE,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.form.fields.tourType.label",
		placeholder: "general.form.fields.tourType.placeholder",
		key: ENUM_SETTINGS_GENERAL_FORM.TOUR_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(TOUR_TYPE_LABELS)
	},
	{
		label: "general.form.fields.groupSize.label",
		placeholder: "general.form.fields.groupSize.placeholder",
		key: ENUM_SETTINGS_GENERAL_FORM.GROUP_SIZE,
		fieldType: "input",
		type: "number"
	}
];
