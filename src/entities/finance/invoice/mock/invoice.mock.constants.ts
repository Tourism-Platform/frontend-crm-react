import { Currency, InvoiceType } from "@/shared/api";

export const MOCK_BOOKING_ID_PREFIX = "a200";

export const MOCK_INVOICE_DEFAULTS = {
	currency: Currency.USD,
	typ: InvoiceType.OperatorToAgency
} as const;

export const MOCK_ORDER_NUMBERS = [
	"RQA-BOOK-01",
	"RQA-BOOK-02",
	"RQA-PROC-03",
	"RQA-DONE-04",
	"RQA-CNCL-05"
] as const;

export const buildInvoiceUuid = (
	statusIndex: number,
	invoiceIndex: number
): string => {
	const status = statusIndex.toString(16).padStart(1, "0");
	const invoice = invoiceIndex.toString(16).padStart(1, "0");
	return `f100${status}${invoice}00-0000-4000-8000-000000000001`;
};

export const buildBookingIdForInvoice = (
	statusIndex: number,
	invoiceIndex: number
): string => {
	const status = statusIndex.toString(16).padStart(1, "0");
	const invoice = invoiceIndex.toString(16).padStart(1, "0");
	return `${MOCK_BOOKING_ID_PREFIX}${status}${invoice}00-0000-4000-8000-000000000002`;
};
