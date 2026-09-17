import { z } from "zod";

import { ENUM_FORM_TRAIN_SECTION } from "../../types/train/section.types";

import { TRAIN_FARES_SCHEMA } from "./fares.schema";
import { TRAIN_PRODUCT_PRICING_SCHEMA } from "./pricing.schema";
import { TRAIN_PRODUCT_GENERAL_SCHEMA } from "./product.schema";

export const TRAIN_PRODUCT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_SECTION.GENERAL]: TRAIN_PRODUCT_GENERAL_SCHEMA,
	[ENUM_FORM_TRAIN_SECTION.FARES]: TRAIN_FARES_SCHEMA,
	[ENUM_FORM_TRAIN_SECTION.PRICING]: TRAIN_PRODUCT_PRICING_SCHEMA
});
