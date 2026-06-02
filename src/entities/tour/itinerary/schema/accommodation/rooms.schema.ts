import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_ROOMS } from "../../types";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

export const ROOMS_SCHEMA = z.object({
	[ENUM_FORM_ROOMS.ROOMS_LIST]: z.array(
		z.object({
			[ENUM_FORM_ROOMS.ROOM_NAME]: z
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
			[ENUM_FORM_ROOMS.DESCRIPTION]: z.string().optional()
		})
	)
});
