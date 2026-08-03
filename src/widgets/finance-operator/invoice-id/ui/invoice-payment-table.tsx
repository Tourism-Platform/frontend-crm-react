import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	Separator,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { formatToDollars } from "@/shared/utils";

import type { IInvoiceDetail } from "@/entities/finance";

import { COLUMNS } from "../model";

interface IInvoicePaymentTableProps {
	invoice: IInvoiceDetail;
}

const InvoicePaymentTableBase: FC<IInvoicePaymentTableProps> = ({
	invoice
}) => {
	const { t } = useTranslation("invoice_id_page");
	const columns = useMemo(() => COLUMNS(t), [t]);

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
			<CardContent className="grid gap-4">
				<h2 className="text-lg font-semibold">
					{t("payment_table.table.title")}
				</h2>
				<SmartTable
					data={invoice.payments}
					columns={columns}
					showTopFilters={false}
					showPagination={false}
				/>
			</CardContent>
		</Card>
	);
};

export const InvoicePaymentTable = withErrorBoundary(InvoicePaymentTableBase);
