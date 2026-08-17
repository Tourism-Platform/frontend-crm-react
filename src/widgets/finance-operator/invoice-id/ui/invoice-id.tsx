import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useGetOperatorBookingOrderQuery } from "@/entities/booking";
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
		isLoading: isInvoiceLoading,
		isError: isInvoiceError
	} = useGetInvoiceByIdQuery(invoiceId ?? "");

	const bookingId = invoice?.bookingId ?? "";
	const { data: booking, isLoading: isBookingLoading } =
		useGetOperatorBookingOrderQuery(bookingId, {
			skip: !bookingId
		});

	if (isInvoiceLoading || (!!bookingId && isBookingLoading)) {
		return <InvoiceIdSkeleton />;
	}

	if (isInvoiceError || !invoice) {
		return <InvoiceNotFound />;
	}

	return (
		<div className="flex flex-col gap-6">
			<InvoiceHeader
				invoiceId={invoice.id}
				paymentId={invoice.paymentId}
				status={invoice.status}
				issueDate={invoice.issueDate}
				dueDate={invoice.dueDate}
			/>

			<InvoicePaymentTable invoice={invoice} />

			<div className="grid grid-cols-2 gap-6">
				<InvoiceInfoCard
					title={t("billing.title")}
					items={getBillingItems(invoice, t, booking)}
				/>

				<InvoiceInfoCard
					title={t("booking.title")}
					items={getBookingItems(invoice, t, booking)}
				/>
			</div>
		</div>
	);
};
