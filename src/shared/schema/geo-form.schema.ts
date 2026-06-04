import { z } from "zod";

export const GEO_FORM_VALUE_SCHEMA = z.object({
	lat: z.number(),
	long: z.number(),
	label: z.string().nullish(),
	name: z.string().nullish(),
	city: z.string().nullish(),
	street: z.string().nullish(),
	housenumber: z.string().nullish(),
	postcode: z.string().nullish(),
	state: z.string().nullish(),
	country: z.string().nullish(),
	country_code: z.string().nullish()
});
