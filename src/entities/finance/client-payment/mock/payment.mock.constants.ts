import { Currency } from "@/shared/api";

export const MOCK_OPERATOR_ID = "00000000-0000-4000-8000-000000000010";

export const MOCK_PAYMENT_DEFAULTS = {
	operator_id: MOCK_OPERATOR_ID,
	currency: Currency.USD
} as const;

export const buildPaymentUuid = (index: number): string => {
	const hex = index.toString(16).padStart(4, "0");
	return `c100${hex}-0000-4000-8000-000000000001`;
};
