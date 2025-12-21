import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { ENUM_PATH, INVOICES_MOCK } from "@/shared/config";
import { Button } from "@/shared/ui";

import { getBillingItems, getBookingItems } from "../model";

import { InvoiceHeader } from "./invoice-header";
import { InvoiceInfoCard } from "./invoice-info-card";
import { InvoicePaymentTable } from "./invoice-payment-table";

export const InvoiceId: FC = () => {
	const { invoiceId } = useParams<{ invoiceId: string }>();
	const { t } = useTranslation("invoice_id_page");

	const invoice = INVOICES_MOCK.find((inv) => inv.paymentId === invoiceId);

	if (!invoice) {
		return (
			<div className="flex flex-col gap-6 font-poppins">
				<Button variant="ghost" size="sm" asChild>
					<Link to={ENUM_PATH.FINANCE.INVOICES}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
				<div className="flex flex-col items-center justify-center h-full gap-4">
					<h1 className="text-2xl font-bold">
						{t("invoice_not_found")}
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<InvoiceHeader
				paymentId={invoice.paymentId}
				status={invoice.status}
				issueDate={invoice.issueDate}
				dueDate={invoice.dueDate}
			/>

			<InvoicePaymentTable invoice={invoice} />

			<div className="grid grid-cols-2 gap-6">
				<InvoiceInfoCard
					title={t("billing.title")}
					items={getBillingItems(invoice, t)}
				/>

				<InvoiceInfoCard
					title={t("booking.title")}
					items={getBookingItems(invoice, t)}
				/>
			</div>
		</div>
	);
};
