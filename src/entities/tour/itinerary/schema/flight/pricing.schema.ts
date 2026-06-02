import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE
} from "../../types";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

export const FLIGHT_PRICING_SCHEMA = z.object({
	[ENUM_FLIGHT_PRICING_FIELD.INVOICING]: z.enum(
		ENUM_FLIGHT_PRICING_INVOICING
	),
	[ENUM_FLIGHT_PRICING_FIELD.PRICING_TYPE]: z.enum(ENUM_FLIGHT_PRICING_TYPE),
	[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]: z
		.number()
		.min(1, {
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			)
		})
		.max(10000, {
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			)
		})
		.optional(),
	[ENUM_FLIGHT_PRICING_FIELD.TAXES]: z
		.number()
		.min(1, {
			message: msg(
				"form.pricing.form.pricing_details.fields.taxes_and_fees.errors.min"
			)
		})
		.max(100, {
			message: msg(
				"form.pricing.form.pricing_details.fields.taxes_and_fees.errors.max"
			)
		})
		.optional(),
	[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: z
		.string()
		.min(1, {
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			)
		})
		.max(3, {
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.max"
			)
		})
		.optional(),
	[ENUM_FLIGHT_PRICING_FIELD.PACKAGE_TYPE]: z.string()
});

export type TFlightPricingSchema = z.infer<typeof FLIGHT_PRICING_SCHEMA>;
