export const ENUM_FORM_OPERATOR_PAYMENT_SETTINGS = {
	METHOD_TYPE: "method_type",
	INTERNAL_LABEL: "internal_label",
	ACCOUNT_NAME_IBAN: "account_name_iban",
	SWIFT_BIC: "swift_bic",
	CURRENCY: "currency",
	BANK_NAME: "bank_name",
	BANK_ADDRESS: "bank_address",
	NOTE: "note"
} as const;

export type ENUM_FORM_OPERATOR_PAYMENT_SETTINGS_TYPE =
	(typeof ENUM_FORM_OPERATOR_PAYMENT_SETTINGS)[keyof typeof ENUM_FORM_OPERATOR_PAYMENT_SETTINGS];
