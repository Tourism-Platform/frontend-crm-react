import { z } from "zod";

import type { PRICING_SCHEMA } from "../../schema";
import type { IFeeFormRow } from "../fee.types";

export const ENUM_FORM_PRICE_DETAILS = {
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency"
} as const;

export type ENUM_FORM_PRICE_DETAILS_TYPE =
	(typeof ENUM_FORM_PRICE_DETAILS)[keyof typeof ENUM_FORM_PRICE_DETAILS];

export type TPricingSchema = z.infer<typeof PRICING_SCHEMA>;

export type TPriceDetailsFees = IFeeFormRow[];
