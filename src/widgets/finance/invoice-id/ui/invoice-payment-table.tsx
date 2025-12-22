import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CustomTable,
	Separator
} from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import type { IInvoice } from "@/entities/finance";

import { COLUMNS } from "../model";

interface IInvoicePaymentTableProps {
	invoice: IInvoice;
}

export const InvoicePaymentTable: FC<IInvoicePaymentTableProps> = ({
	invoice
}) => {
	const { t } = useTranslation("invoice_id_page");

	return (
		<Card className="gap-4">
			<CardHeader className="flex gap-8 text-md">
				<div className="flex gap-2">
					<span className="font-semibold">
						{t("payment_table.summary.total_invoiced")}:
					</span>
					<span>{formatToDollars(invoice.amount)}</span>
				</div>
				<div className="flex gap-2">
					<span className="font-semibold">
						{t("payment_table.summary.paid")}:
					</span>
					<span>{formatToDollars(invoice.paidAmount)}</span>
				</div>
				<div className="flex gap-2">
					<span className="font-semibold">
						{t("payment_table.summary.remaining")}:
					</span>
					<span>{formatToDollars(invoice.remainingAmount)}</span>
				</div>
			</CardHeader>
			<Separator />
			<CardContent>
				<h2 className="text-lg font-semibold">
					{t("payment_table.table.title")}
				</h2>
				<CustomTable
					data={invoice.payments}
					columns={COLUMNS()}
					showTopFilters={false}
					showPagination={false}
				/>
			</CardContent>
		</Card>
	);
};
