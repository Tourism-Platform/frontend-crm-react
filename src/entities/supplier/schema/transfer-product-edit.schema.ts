import { z } from "zod";

import { ENUM_FORM_TRANSFER_SECTION } from "../types/transfer/section.types";

import { TRANSFER_CARS_SCHEMA } from "./transfer-cars.schema";
import { TRANSFER_PRODUCT_PRICING_SCHEMA } from "./transfer-product-pricing.schema";
import { TRANSFER_PRODUCT_GENERAL_SCHEMA } from "./transfer-product.schema";

export const TRANSFER_PRODUCT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_TRANSFER_SECTION.GENERAL]: TRANSFER_PRODUCT_GENERAL_SCHEMA,
	[ENUM_FORM_TRANSFER_SECTION.CARS]: TRANSFER_CARS_SCHEMA,
	[ENUM_FORM_TRANSFER_SECTION.PRICING]: TRANSFER_PRODUCT_PRICING_SCHEMA
});
