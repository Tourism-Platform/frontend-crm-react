import { z } from "zod";

import { Gender } from "@/shared/api";
import { type TPreviewBookingPageKeys, i18nKey } from "@/shared/config";

import { hasTravellerPassportFile } from "@/entities/booking/order/converters/booking-pax.converters";

import { ENUM_FORM_PREVIEW_BOOKING } from "../types";

const msg = i18nKey<TPreviewBookingPageKeys>();

const FILE_METADATA_SCHEMA = z.object({
	id: z.string(),
	name: z.string(),
	size: z.number(),
	type: z.string(),
	url: z.string(),
	file: z.instanceof(File).optional()
});

const isTravellerFieldsComplete = (traveller: {
	pax_id?: string;
	first_name?: string;
	last_name?: string;
	gender?: Gender;
	nationality?: string;
	date_of_birth?: Date;
	passport_number?: string;
	passport_expiry?: Date;
}) =>
	Boolean(
		traveller.first_name?.trim() &&
			traveller.last_name?.trim() &&
			traveller.gender &&
			traveller.nationality?.trim() &&
			traveller.date_of_birth &&
			traveller.passport_number?.trim() &&
			traveller.passport_expiry
	);

export const TRAVELLER_DETAILS_SCHEMA = z
	.object({
		[ENUM_FORM_PREVIEW_BOOKING.PAX_ID]: z.string().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.FIRST_NAME]: z.string().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.LAST_NAME]: z.string().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.GENDER]: z.nativeEnum(Gender).optional(),
		[ENUM_FORM_PREVIEW_BOOKING.DATE_OF_BIRTH]: z.coerce.date().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.NATIONALITY]: z.string().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.PASSPORT_NUMBER]: z.string().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.PASSPORT_EXPIRY]: z.coerce.date().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.NOTE]: z.string().optional(),
		[ENUM_FORM_PREVIEW_BOOKING.FILE]: z
			.array(FILE_METADATA_SCHEMA)
			.optional()
	})
	.superRefine((traveller, ctx) => {
		if (
			isTravellerFieldsComplete(traveller) &&
			!traveller.pax_id &&
			!hasTravellerPassportFile(traveller)
		) {
			ctx.addIssue({
				code: "custom",
				message: msg("step_2.fields.file.errors.required"),
				path: [ENUM_FORM_PREVIEW_BOOKING.FILE]
			});
		}
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

export const PREVIEW_BOOKING_DEFAULT_VALUES = {
	[ENUM_FORM_PREVIEW_BOOKING.DATE]: undefined,
	[ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT]: 1,
	[ENUM_FORM_PREVIEW_BOOKING.OPTION_ID]: "",
	[ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS]: [{}]
} satisfies z.input<typeof PREVIEW_BOOKING_SCHEMA>;
