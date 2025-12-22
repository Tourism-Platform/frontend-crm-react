import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type IInvoice } from "@/entities/finance";

export const COLUMNS = (): ColumnDef<IInvoice>[] => {
	const { t } = useTranslation("invoice_id_page");
	return [
		{
			header: t("payment_table.table.fields.no"),
			accessorKey: "no",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("no")}</div>
			),
			size: 64
		},
		{
			header: t("payment_table.table.fields.amount"),
			accessorKey: "amount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("amount"))}
				</div>
			),
			size: 300
		},
		{
			header: t("payment_table.table.fields.date"),
			accessorKey: "date",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("date")}</div>
			),
			size: 300
		},
		{
			id: "actions",
			header: () => (
				<div className="text-right">
					{t("payment_table.table.fields.document")}
				</div>
			),
			cell: () => (
				<div className="text-right">
					<Button
						variant="outline"
						size="sm"
						className="h-8 py-0 rounded px-4 text-xs font-medium border-gray-200"
					>
						{t("payment_table.table.fields.open")}
					</Button>
				</div>
			),
			size: 60,
			enableHiding: false
		}
	];
};
