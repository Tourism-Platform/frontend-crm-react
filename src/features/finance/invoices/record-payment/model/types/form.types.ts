import { z } from "zod";

import type { TInvoiceIdPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { RECORD_PAYMENT_SCHEMA } from "../config";

export const ENUM_FORM_RECORD_PAYMENT = {
	AMOUNT: "amount",
	METHOD: "method"
} as const;

export type TForm = TFormField<
	TInvoiceIdPageKeys,
	ENUM_FORM_RECORD_PAYMENT_TYPE
>;
export type ENUM_FORM_RECORD_PAYMENT_TYPE =
	(typeof ENUM_FORM_RECORD_PAYMENT)[keyof typeof ENUM_FORM_RECORD_PAYMENT];

export type TRecordPaymentSchema = z.infer<typeof RECORD_PAYMENT_SCHEMA>;
