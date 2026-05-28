import { z } from "zod";

import type { OPERATOR_CURRENCY_RATE_CREATE_SCHEMA } from "../schema";

export const ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE = {
	FROM_CURRENCY: "from_currency",
	TO_CURRENCY: "to_currency",
	RATE: "rate"
} as const;

export type ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE_TYPE =
	(typeof ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE)[keyof typeof ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE];

export type TOperatorCurrencyRateCreateSchema = z.infer<
	typeof OPERATOR_CURRENCY_RATE_CREATE_SCHEMA
>;
