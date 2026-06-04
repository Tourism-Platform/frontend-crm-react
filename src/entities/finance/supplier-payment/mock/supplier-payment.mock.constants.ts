import { Currency } from "@/shared/api";

export const MOCK_SUPPLIER_OPERATOR_ID = "00000000-0000-4000-8000-000000000020";

export const MOCK_SUPPLIER_PAYMENT_DEFAULTS = {
	operator_id: MOCK_SUPPLIER_OPERATOR_ID,
	currency: Currency.USD,
	rate: "1"
} as const;

export const MOCK_RECEIPT_URL =
	"https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX";

export const buildSupplierPaymentUuid = (index: number): string => {
	const hex = index.toString(16).padStart(4, "0");
	return `s200${hex}-0000-4000-8000-000000000001`;
};

export const buildEventUuid = (index: number): string => {
	const hex = index.toString(16).padStart(4, "0");
	return `e200${hex}-0000-4000-8000-000000000001`;
};
