import { z } from "zod";

import { ENUM_FORM_BUS_SECTION } from "../types/bus/section.types";

import { BUS_PRODUCT_PRICING_SCHEMA } from "./bus-product-pricing.schema";
import { BUS_PRODUCT_GENERAL_SCHEMA } from "./bus-product.schema";
import { BUS_VEHICLES_SCHEMA } from "./bus-vehicles.schema";

export const BUS_PRODUCT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_BUS_SECTION.GENERAL]: BUS_PRODUCT_GENERAL_SCHEMA,
	[ENUM_FORM_BUS_SECTION.VEHICLES]: BUS_VEHICLES_SCHEMA,
	[ENUM_FORM_BUS_SECTION.PRICING]: BUS_PRODUCT_PRICING_SCHEMA
});
