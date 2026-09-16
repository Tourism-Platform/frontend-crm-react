import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_HOTEL_PRODUCT_ROOMS } from "../types/hotel/rooms-edit-form.types";

const msg = i18nKey<THotelProductEditPageKeys>();

export const HOTEL_ROOMS_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST]: z.array(
		z.object({
			[ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID]: z.string(),
			[ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOM_NAME]: z
				.string({
					message: msg(
						"form.rooms.details.form.fields.room_name.errors.required"
					)
				})
				.min(1, {
					message: msg(
						"form.rooms.details.form.fields.room_name.errors.required"
					)
				})
				.max(100, {
					message: msg(
						"form.rooms.details.form.fields.room_name.errors.max"
					)
				}),
			[ENUM_FORM_HOTEL_PRODUCT_ROOMS.DESCRIPTION]: z.string().optional()
		})
	)
});
