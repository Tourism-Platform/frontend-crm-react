import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_TOUR_CREATE_FORM as ENUM_FORM,
	type TForm,
	TOUR_CATEGORY_LABELS,
	TOUR_TYPE_LABELS
} from "@/entities/tour";

export const FORM_CREATE_TOUR_LIST = (): TForm[] => [
	{
		label: "create.form.fields.tourTitle.label",
		placeholder: "create.form.fields.tourTitle.placeholder",
		key: ENUM_FORM.TOUR_TITLE,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "create.form.fields.tourType.label",
		placeholder: "create.form.fields.tourType.placeholder",
		key: ENUM_FORM.TOUR_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(TOUR_TYPE_LABELS)
	},
	{
		label: "create.form.fields.groupSize.label",
		placeholder: "create.form.fields.groupSize.placeholder",
		key: ENUM_FORM.GROUP_SIZE,
		fieldType: "input",
		type: "number"
	},
	{
		label: "create.form.fields.duration.label",
		placeholder: "create.form.fields.duration.placeholder_left",
		key: ENUM_FORM.DURATION,
		fieldType: "input"
	},
	{
		label: "create.form.fields.ageRequires.label",
		placeholder: "create.form.fields.ageRequires.placeholder_left",
		key: ENUM_FORM.AGE_REQUIRES,
		fieldType: "input"
	},
	{
		label: "create.form.fields.tourCategories.label",
		placeholder: "create.form.fields.tourCategories.placeholder",
		key: ENUM_FORM.TOUR_CATEGORIES,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(TOUR_CATEGORY_LABELS),
		className: "col-span-2",
		badgeVariant: "secondary"
	}
];
