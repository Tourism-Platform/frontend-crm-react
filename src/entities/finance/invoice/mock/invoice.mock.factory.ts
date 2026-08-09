import { type InvoiceDetailResponse, type InvoiceListItem } from "@/shared/api";

import {
	MOCK_INVOICE_DEFAULTS,
	MOCK_ORDER_NUMBERS,
	buildBookingIdForInvoice,
	buildInvoiceUuid
} from "./invoice.mock.constants";
import { INVOICES_PER_STATUS, INVOICE_STATUS_SEED } from "./invoice.seed";

const padNum = (n: number) => String(n).padStart(2, "0");

const buildAmounts = (statusIndex: number, invoiceIndex: number) => {
	const total = (statusIndex + 1) * 1000 + invoiceIndex * 250;
	const paidRatio =
		statusIndex === 3
			? 1
			: statusIndex === 0 || statusIndex === 5
				? 0
				: statusIndex === 2
					? 0.4
					: statusIndex === 4
						? 0.1
						: 0;
	const paid = Math.round(total * paidRatio);
	const balance = total - paid;

	return {
		total_amount: total,
		paid_amount: paid,
		total: String(total),
		paid_amount_str: String(paid),
		balance: String(balance),
		amount: String(total)
	};
};

export interface IInvoiceMockBundle {
	listItems: InvoiceListItem[];
	detailsById: Map<string, InvoiceDetailResponse>;
}

export const createInvoiceMocks = (): IInvoiceMockBundle => {
	const listItems: InvoiceListItem[] = [];
	const detailsById = new Map<string, InvoiceDetailResponse>();

	INVOICE_STATUS_SEED.forEach((row, statusIndex) => {
		for (
			let invoiceIndex = 1;
			invoiceIndex <= INVOICES_PER_STATUS;
			invoiceIndex += 1
		) {
			const id = buildInvoiceUuid(statusIndex, invoiceIndex);
			const booking_id = buildBookingIdForInvoice(
				statusIndex,
				invoiceIndex
			);
			const amounts = buildAmounts(statusIndex, invoiceIndex);
			const month = String(statusIndex + 1).padStart(2, "0");
			const issue_date = `2025-${month}-${padNum(invoiceIndex)}T10:00:00Z`;
			const invoice_number = `INV-${row.label}-${padNum(invoiceIndex)}`;
			const order_number =
				MOCK_ORDER_NUMBERS[
					(statusIndex + invoiceIndex - 1) % MOCK_ORDER_NUMBERS.length
				];
			// !!! TODO: add counterparty_name
			const listItem: InvoiceListItem = {
				id,
				booking_id,
				status: row.status,
				total_amount: amounts.total_amount,
				paid_amount: amounts.paid_amount,
				typ: MOCK_INVOICE_DEFAULTS.typ,
				counterparty_name: "Tour Firm",
				currency: MOCK_INVOICE_DEFAULTS.currency,
				issue_date,
				invoice_number,
				order_number
			};

			const detail: InvoiceDetailResponse = {
				id,
				invoice_number,
				booking_id,
				order_number,
				typ: MOCK_INVOICE_DEFAULTS.typ,
				status: row.status,
				amount: amounts.amount,
				currency: MOCK_INVOICE_DEFAULTS.currency,
				total: amounts.total,
				paid_amount: amounts.paid_amount_str,
				balance: amounts.balance,
				issued_at: issue_date,
				payment_details: null
			};

			listItems.push(listItem);
			detailsById.set(id, detail);
		}
	});

	return { listItems, detailsById };
};
