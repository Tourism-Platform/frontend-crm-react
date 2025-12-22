import { z } from "zod";

import type { TClientPaymentsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { NEW_PAYMENT_SCHEMA } from "../config";

export type TForm = TFormField<
	TClientPaymentsPageKeys,
	ENUM_FORM_NEW_PAYMENT_TYPE
>;

export const ENUM_FORM_NEW_PAYMENT = {
	PAYMENT_ID: "paymentId",
	AMOUNT: "amount",
	ORDER_ID: "orderId",
	NOTE: "note"
} as const;

export type ENUM_FORM_NEW_PAYMENT_TYPE =
	(typeof ENUM_FORM_NEW_PAYMENT)[keyof typeof ENUM_FORM_NEW_PAYMENT];

export type TNewPaymentSchema = z.infer<typeof NEW_PAYMENT_SCHEMA>;
