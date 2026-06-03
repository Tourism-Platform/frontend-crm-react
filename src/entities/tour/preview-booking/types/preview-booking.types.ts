import { z } from "zod";

import type { PREVIEW_BOOKING_SCHEMA } from "../schema/preview-booking.schema";

export const ENUM_FORM_PREVIEW_BOOKING = {
	DATE: "date",
	TRAVELLERS_COUNT: "travellers_count",
	OPTION_ID: "option_id",
	TRAVELLERS: "travellers",
	FIRST_NAME: "first_name",
	LAST_NAME: "last_name",
	DATE_OF_BIRTH: "date_of_birth",
	NATIONALITY: "nationality",
	PASSPORT_NUMBER: "passport_number",
	PASSPORT_EXPIRY: "passport_expiry",
	GENDER: "gender",
	NOTE: "note",
	FILE: "file",
	PAX_ID: "pax_id"
} as const;

export type ENUM_FORM_PREVIEW_BOOKING_TYPE =
	(typeof ENUM_FORM_PREVIEW_BOOKING)[keyof typeof ENUM_FORM_PREVIEW_BOOKING];

export type TPreviewBookingSchema = z.infer<typeof PREVIEW_BOOKING_SCHEMA>;

export interface IPreviewBookingSubmitBackendResponse {
	booking_id: string;
	status: string;
	created_at: string;
}
