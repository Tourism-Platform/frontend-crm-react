import { z } from "zod";

import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_TRANSPORTATION_FORM_SECTION as ENUM_FORM_SECTION,
	ENUM_HOUSING_SOURCE
} from "../../types";

import { CARS_SCHEMA } from "./cars.schema";
import { GENERAL_INFO_SCHEMA } from "./general-info.schema";
import { TRANSPORTATION_PRICING_SCHEMA } from "./pricing.schema";

export const TRANSPORTATION_EDIT_SCHEMA = z.object({
	[ENUM_FORM_SECTION.GENERAL]: GENERAL_INFO_SCHEMA,
	[ENUM_FORM_SECTION.CARS]: CARS_SCHEMA,
	[ENUM_FORM_SECTION.PRICING]: TRANSPORTATION_PRICING_SCHEMA,
	[ENUM_FORM_SECTION.NAME]: z.string().optional(),
	[ENUM_FORM_SECTION.DAY]: z.number().min(1).optional(),
	[ENUM_FORM_SECTION.POSITION]: z.number().optional(),
	[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: z.string().uuid().optional(),
	[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]: z
		.string()
		.uuid()
		.nullable()
		.optional(),
	[ENUM_FORM_EVENT_PRODUCT.SOURCE]: z
		.enum([ENUM_HOUSING_SOURCE.CUSTOM, ENUM_HOUSING_SOURCE.INHERITED])
		.optional(),
	[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: z.boolean().optional()
});
