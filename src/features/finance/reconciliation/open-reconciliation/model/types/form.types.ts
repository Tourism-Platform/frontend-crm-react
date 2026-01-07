import type { TReconciliationIdPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

export const ENUM_FORM_OPEN_RECONCILIATION = {
	ORDER_ID: "orderId",
	AMOUNT: "amount",
	NOTE: "note",
	FILES: "files"
} as const;

export type TForm = TFormField<
	TReconciliationIdPageKeys,
	ENUM_FORM_OPEN_RECONCILIATION_TYPE
>;
export type ENUM_FORM_OPEN_RECONCILIATION_TYPE =
	(typeof ENUM_FORM_OPEN_RECONCILIATION)[keyof typeof ENUM_FORM_OPEN_RECONCILIATION];
