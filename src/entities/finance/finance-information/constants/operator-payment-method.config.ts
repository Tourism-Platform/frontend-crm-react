import { ENUM_PAYMENT_ROUTE_METHODS } from "../types";

export const OPERATOR_PAYMENT_METHOD_LABELS = {
	[ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT]:
		"finance.payment_methods.classic_swift",
	[ENUM_PAYMENT_ROUTE_METHODS.WISE]: "finance.payment_methods.wise"
} as const;
