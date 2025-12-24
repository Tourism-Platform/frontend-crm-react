import { z } from "zod";

import type { TTourEventFlightEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { PRICING_SCHEMA } from "../schema";

export type TForm = TFormField<
	TTourEventFlightEditPageKeys,
	ENUM_FORM_PRICE_DETAILS_TYPE
>;

export const ENUM_FORM_PRICE_DETAILS = {
	TOTAL_PRICE: "total_price",
	TAXES: "taxes",
	CURRENCY: "currency"
} as const;

export type ENUM_FORM_PRICE_DETAILS_TYPE =
	(typeof ENUM_FORM_PRICE_DETAILS)[keyof typeof ENUM_FORM_PRICE_DETAILS];

export type TPricingSchema = z.infer<typeof PRICING_SCHEMA>;
