import { z } from "zod";

import { type TPreviewBookingPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_PREVIEW_BOOKING } from "../types";

const msg = i18nKey<TPreviewBookingPageKeys>();

export const TRAVELLER_DETAILS_SCHEMA = z.object({
	[ENUM_FORM_PREVIEW_BOOKING.FIRST_NAME]: z
		.string()
		.min(1, { message: msg("step_2.fields.first_name.errors.required") }),
	[ENUM_FORM_PREVIEW_BOOKING.LAST_NAME]: z
		.string()
		.min(1, { message: msg("step_2.fields.last_name.errors.required") }),
	[ENUM_FORM_PREVIEW_BOOKING.DATE_OF_BIRTH]: z.coerce.date({
		error: msg("step_2.fields.date_of_birth.errors.required")
	}),
	[ENUM_FORM_PREVIEW_BOOKING.NATIONALITY]: z
		.string()
		.min(1, { message: msg("step_2.fields.nationality.errors.required") }),
	[ENUM_FORM_PREVIEW_BOOKING.PASSPORT_NUMBER]: z.string().min(1, {
		message: msg("step_2.fields.passport_number.errors.required")
	}),
	[ENUM_FORM_PREVIEW_BOOKING.PASSPORT_EXPIRY]: z.coerce.date({
		error: msg("step_2.fields.passport_expiry.errors.required")
	}),
	[ENUM_FORM_PREVIEW_BOOKING.NOTE]: z.string().optional(),
	[ENUM_FORM_PREVIEW_BOOKING.FILE]: z.any().optional()
});

export const PREVIEW_BOOKING_SCHEMA = z.object({
	[ENUM_FORM_PREVIEW_BOOKING.DATE]: z.coerce.date({
		error: msg("step_1.fields.date.errors.required")
	}),
	[ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT]: z
		.number()
		.min(1, { message: msg("step_1.travellers.errors.min") })
		.max(20, { message: msg("step_1.travellers.errors.max") }),
	[ENUM_FORM_PREVIEW_BOOKING.OPTION_ID]: z
		.string()
		.min(1, { message: msg("step_1.options.errors.required") }),
	[ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS]: z.array(TRAVELLER_DETAILS_SCHEMA)
});
