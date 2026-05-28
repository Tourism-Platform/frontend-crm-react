import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_OPERATOR_GENERAL_INFO } from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

export const OPERATOR_GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_OPERATOR_GENERAL_INFO.TOUR_MARGIN]: z
		.number({
			message: msg(
				"general.form.fields.default_tour_margin.errors.required"
			)
		})
		.min(0, msg("general.form.fields.default_tour_margin.errors.min"))
		.max(100, msg("general.form.fields.default_tour_margin.errors.max")),
	[ENUM_FORM_OPERATOR_GENERAL_INFO.STAFF_PAYOUTS]: z
		.number({
			message: msg("general.form.fields.staff_payouts.errors.required")
		})
		.min(0, msg("general.form.fields.staff_payouts.errors.min"))
		.max(100, msg("general.form.fields.staff_payouts.errors.max"))
});
