import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

export const ENUM_FORM_OPERATOR_PAYMENT_SETTINGS = {
	METHOD_TYPE: "method_type",
	INTERNAL_LABEL: "internal_label",
	ACCOUNT_NAME_IBAN: "account_name_iban",
	SWIFT_BIC: "swift_bic",
	CURRENCY: "currency",
	BANK_NAME: "bank_name",
	BANK_ADDRESS: "bank_address",
	ACCOUNT_ID_EMAIL: "account_id_email",
	PAYMENT_LINK: "payment_link",
	NOTE: "note"
} as const;

export type ENUM_FORM_OPERATOR_PAYMENT_SETTINGS_TYPE =
	(typeof ENUM_FORM_OPERATOR_PAYMENT_SETTINGS)[keyof typeof ENUM_FORM_OPERATOR_PAYMENT_SETTINGS];

export const ENUM_PAYMENT_ROUTE_METHODS = {
	CLASSIC_SWIFT: "classic_swift",
	WISE: "wise"
} as const;

export type ENUM_PAYMENT_ROUTE_METHODS_TYPE =
	(typeof ENUM_PAYMENT_ROUTE_METHODS)[keyof typeof ENUM_PAYMENT_ROUTE_METHODS];

// Frontend абстракция сущности
export type TOperatorPaymentRoute = {
	id: string;
	operatorId: string;
	internalLabel: string;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	note: string | null;
	methodType: ENUM_PAYMENT_ROUTE_METHODS_TYPE;
	details:
		| {
				typ: typeof ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT;
				accountNameIban: string;
				swiftBic: string;
				bankName: string;
				bankAddress: string;
		  }
		| {
				typ: typeof ENUM_PAYMENT_ROUTE_METHODS.WISE;
				accountIdEmail: string;
				paymentLink: string;
		  };
};
