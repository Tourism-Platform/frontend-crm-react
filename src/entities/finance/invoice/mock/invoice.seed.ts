import {
	ENUM_INVOICE_STATUS_BACKEND,
	type ENUM_INVOICE_STATUS_BACKEND_TYPE
} from "../types";

export type TInvoiceStatusSeedItem = {
	status: ENUM_INVOICE_STATUS_BACKEND_TYPE;
	label: string;
};

export const INVOICE_STATUS_SEED: readonly TInvoiceStatusSeedItem[] = [
	{ status: ENUM_INVOICE_STATUS_BACKEND.DRAFT, label: "DRF" },
	{ status: ENUM_INVOICE_STATUS_BACKEND.SENT, label: "SNT" },
	{ status: ENUM_INVOICE_STATUS_BACKEND.PARTIAL, label: "PRT" },
	{ status: ENUM_INVOICE_STATUS_BACKEND.PAID, label: "PAID" },
	{ status: ENUM_INVOICE_STATUS_BACKEND.OVERDUE, label: "OVD" },
	{ status: ENUM_INVOICE_STATUS_BACKEND.CANCELLED, label: "CNL" }
] as const;

/** How many invoices to generate per status row. */
export const INVOICES_PER_STATUS = 4;

/** Minimal PDF bytes accepted by upload endpoints. */
function buildPdfFile(label: string): File {
	const content = `%PDF-1.4
1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj
2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj
3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] >>endobj
trailer<< /Root 1 0 R >>
%%EOF
${label}
`;
	return new File([content], `${label}.pdf`, { type: "application/pdf" });
}

export function buildInvoicePdfFile(invoiceNumber: string): File {
	return buildPdfFile(`Invoice ${invoiceNumber}`);
}
