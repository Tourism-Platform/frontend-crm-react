import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_TOUR_SETTINGS_GENERAL_FORM,
	type ITourGeneral,
	LANGUAGES_LABELS,
	TOUR_CATEGORY_LABELS,
	TOUR_TYPE_LABELS
} from "@/entities/tour";

import { type TGeneralForm } from "../types";

export const GENERAL_FORM_LIST = ({
	defaultValues
}: {
	defaultValues: ITourGeneral | undefined;
}): TGeneralForm[] => [
	{
		label: "general.form.fields.tourTitle.label",
		placeholder: "general.form.fields.tourTitle.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_TITLE,
		fieldType: "input",
		className: "col-span-2",
		disabled: true
	},
	{
		label: "general.form.fields.tourType.label",
		placeholder: "general.form.fields.tourType.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(TOUR_TYPE_LABELS),
		defaultValue: defaultValues?.tourType
	},
	{
		label: "general.form.fields.ageRequires.label",
		placeholder: "general.form.fields.ageRequires.placeholder_left",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.AGE_REQUIRES,
		fieldType: "input"
	},
	{
		label: "general.form.fields.groupSizeMin.label",
		placeholder: "general.form.fields.groupSizeMin.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE_MIN,
		fieldType: "input",
		type: "number"
	},
	{
		label: "general.form.fields.groupSize.label",
		placeholder: "general.form.fields.groupSize.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE,
		fieldType: "input",
		type: "number"
	},
	{
		label: "general.form.fields.durationHours.label",
		placeholder: "general.form.fields.durationHours.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION_HOURS,
		fieldType: "input",
		type: "number"
	},
	{
		label: "general.form.fields.duration.label",
		placeholder: "general.form.fields.duration.placeholder_left",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION,
		fieldType: "input"
	},
	{
		label: "general.form.fields.tourCategories.label",
		placeholder: "general.form.fields.tourCategories.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_CATEGORIES,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(TOUR_CATEGORY_LABELS),
		className: "col-span-2",
		badgeVariant: "secondary"
	},
	{
		label: "general.form.fields.languages.label",
		placeholder: "general.form.fields.languages.placeholder",
		key: ENUM_TOUR_SETTINGS_GENERAL_FORM.LANGUAGES,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(LANGUAGES_LABELS),
		className: "col-span-2",
		badgeVariant: "secondary"
	}
];
