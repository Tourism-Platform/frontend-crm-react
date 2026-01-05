import { z } from "zod";

import type { TClientPaymentsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ASSIGN_PAYMENT_SCHEMA } from "../config";

export type TForm = TFormField<
	TClientPaymentsPageKeys,
	ENUM_FORM_ASSIGN_PAYMENT_TYPE
>;

export const ENUM_FORM_ASSIGN_PAYMENT = {
	ORDER_ID: "orderId",
	AMOUNT: "amount",
	NOTE: "note",
	FILES: "files"
} as const;

export type ENUM_FORM_ASSIGN_PAYMENT_TYPE =
	(typeof ENUM_FORM_ASSIGN_PAYMENT)[keyof typeof ENUM_FORM_ASSIGN_PAYMENT];

export type TAssignPaymentSchema = z.infer<typeof ASSIGN_PAYMENT_SCHEMA>;
