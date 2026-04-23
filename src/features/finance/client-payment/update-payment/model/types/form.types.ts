import { z } from "zod";

import type { TClientPaymentsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { UPDATE_PAYMENT_SCHEMA } from "../config";

export type TUpdatePaymentForm = TFormField<
	TClientPaymentsPageKeys,
	ENUM_FORM_UPDATE_PAYMENT_TYPE
>;

export const ENUM_FORM_UPDATE_PAYMENT = {
	ORDER_ID: "orderId",
	AMOUNT: "amount",
	NOTE: "note",
	FILES: "files"
} as const;

export type ENUM_FORM_UPDATE_PAYMENT_TYPE =
	(typeof ENUM_FORM_UPDATE_PAYMENT)[keyof typeof ENUM_FORM_UPDATE_PAYMENT];

export type TUpdatePaymentSchema = z.infer<typeof UPDATE_PAYMENT_SCHEMA>;
