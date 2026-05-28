import { ENUM_FORM_OPERATOR_GENERAL_INFO } from "@/entities/finance";

import type { TForm } from "../types";

export const GENERAL_INFO_LIST: TForm[] = [
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.TOUR_MARGIN,
		label: "general.form.fields.default_tour_margin.label",
		placeholder: "general.form.fields.default_tour_margin.placeholder",
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	},
	{
		key: ENUM_FORM_OPERATOR_GENERAL_INFO.STAFF_PAYOUTS,
		label: "general.form.fields.staff_payouts.label",
		placeholder: "general.form.fields.staff_payouts.placeholder",
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	}
];
