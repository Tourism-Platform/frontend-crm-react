import { z } from "zod";

import type { TSupplierPaymentsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { CONFIRM_PAYMENT_SCHEMA } from "../config";

export const ENUM_FORM_CONFIRM_PAYMENT = {
	ORDER_ID: "orderId",
	AMOUNT: "amount",
	NOTE: "note",
	FILES: "files"
} as const;

export type TForm = TFormField<
	TSupplierPaymentsPageKeys,
	ENUM_FORM_CONFIRM_PAYMENT_TYPE
>;
export type ENUM_FORM_CONFIRM_PAYMENT_TYPE =
	(typeof ENUM_FORM_CONFIRM_PAYMENT)[keyof typeof ENUM_FORM_CONFIRM_PAYMENT];

export type TConfirmPaymentSchema = z.infer<typeof CONFIRM_PAYMENT_SCHEMA>;
