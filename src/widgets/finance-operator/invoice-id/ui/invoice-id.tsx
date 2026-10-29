import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useCurrentLanguage } from "@/shared/hooks";
import { DataState } from "@/shared/ui";

import { useGetOperatorBookingOrderQuery } from "@/entities/booking";
import { useGetInvoiceByIdQuery } from "@/entities/finance";

import { getBillingItems, getBookingItems } from "../model";

import { InvoiceHeader } from "./invoice-header";
import { InvoiceInfoCard } from "./invoice-info-card";
import { InvoiceNotFound } from "./invoice-not-found";
import { InvoicePaymentTable } from "./invoice-payment-table";

export const InvoiceId: FC = () => {
	const { invoiceId } = useParams<{ invoiceId: string }>();
	const { t } = useTranslation("invoice_id_page");
	const language = useCurrentLanguage();

	const {
		data: invoice,
		isLoading: isInvoiceLoading,
		isError: isInvoiceError
	} = useGetInvoiceByIdQuery(invoiceId ?? "");

	const bookingId = invoice?.bookingId ?? "";
	const { data: booking, isLoading: isBookingLoading } =
		useGetOperatorBookingOrderQuery(
			{ bookingId, language },
			{ skip: !bookingId }
		);

	const isLoading = isInvoiceLoading || (!!bookingId && isBookingLoading);

	if (!isLoading && (isInvoiceError || !invoice)) {
		return <InvoiceNotFound />;
	}

	return (
		<div className="flex flex-1 flex-col gap-5">
			<DataState variant="page" data={invoice} isLoading={isLoading}>
				{(invoice) => (
					<>
						<InvoiceHeader
							invoiceId={invoice.id}
							paymentId={invoice.paymentId}
							status={invoice.status}
							issueDate={invoice.issueDate}
							dueDate={invoice.dueDate}
							remainingAmount={invoice.remainingAmount}
						/>

						<InvoicePaymentTable invoice={invoice} />

						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<InvoiceInfoCard
								title={t("billing.title")}
								items={getBillingItems(invoice, t, booking)}
							/>

							<InvoiceInfoCard
								title={t("booking.title")}
								items={getBookingItems(invoice, t, booking)}
							/>
						</div>
					</>
				)}
			</DataState>
		</div>
	);
};
