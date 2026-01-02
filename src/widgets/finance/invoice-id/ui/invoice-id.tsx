import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useGetInvoiceByIdQuery } from "@/entities/finance";

import { getBillingItems, getBookingItems } from "../model";

import { InvoiceHeader } from "./invoice-header";
import { InvoiceIdSkeleton } from "./invoice-id-skeleton";
import { InvoiceInfoCard } from "./invoice-info-card";
import { InvoiceNotFound } from "./invoice-not-found";
import { InvoicePaymentTable } from "./invoice-payment-table";

export const InvoiceId: FC = () => {
	const { invoiceId } = useParams<{ invoiceId: string }>();
	const { t } = useTranslation("invoice_id_page");

	const {
		data: invoice,
		isLoading,
		isError
	} = useGetInvoiceByIdQuery(invoiceId ?? "");

	if (isLoading) {
		return <InvoiceIdSkeleton />;
	}

	if (isError || !invoice) {
		return <InvoiceNotFound />;
	}

	return (
		<div className="flex flex-col gap-6">
			<InvoiceHeader
				paymentId={invoice.paymentId}
				status={invoice.status}
				issueDate={invoice.issueDate}
				dueDate={invoice.dueDate}
				file={invoice.file}
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
