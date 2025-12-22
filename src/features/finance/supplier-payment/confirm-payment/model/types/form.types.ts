import type { TSupplierPaymentsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

export const ENUM_FORM_CONFIRM_PAYMENT = {
	ORDER_ID: "orderId",
	AMOUNT: "amount",
	NOTE: "note"
} as const;

export type TForm = TFormField<
	TSupplierPaymentsPageKeys,
	ENUM_FORM_CONFIRM_PAYMENT_TYPE
>;
export type ENUM_FORM_CONFIRM_PAYMENT_TYPE =
	(typeof ENUM_FORM_CONFIRM_PAYMENT)[keyof typeof ENUM_FORM_CONFIRM_PAYMENT];
