import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Badge, Checkbox } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_INVOICE_STATUS_TYPE,
	type IInvoice,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS
} from "@/entities/finance";

export const COLUMNS = (): ColumnDef<IInvoice>[] => {
	const { t } = useTranslation("invoices_page");
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.paymentId"),
			accessorKey: "paymentId",
			cell: ({ row }) => (
				<Link
					to={ENUM_PATH.FINANCE.INVOICE_ID.replace(
						":invoiceId",
						row.getValue("paymentId")
					)}
					className="font-medium text-primary hover:underline"
				>
					{row.getValue("paymentId")}
				</Link>
			),
			size: 160
		},
		{
			header: t("table.orderId"),
			accessorKey: "orderId",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("orderId")}</div>
			),
			size: 160
		},
		{
			header: t("table.issueDate"),
			accessorKey: "issueDate",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("issueDate")}</div>
			),
			size: 160
		},
		{
			header: t("table.amount"),
			accessorKey: "amount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("amount"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.paidAmount"),
			accessorKey: "paidAmount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("paidAmount"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_INVOICE_STATUS_TYPE;

				return (
					<Badge variant={INVOICE_STATUS_VARIANTS[status]}>
						{t(INVOICE_STATUS_LABELS[status])}
					</Badge>
				);
			},
			size: 160
		}
	];
};
