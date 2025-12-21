import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Checkbox } from "@/shared/ui";

import {
	ENUM_INVOICE_STATUS,
	type ENUM_INVOICE_STATUS_TYPE,
	type IInvoice,
	INVOICE_STATUS_LABELS
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
				<div className="font-medium">{row.getValue("paymentId")}</div>
			),
			size: 160
		},
		{
			header: t("table.orderId"),
			accessorKey: "orderId",
			size: 160
		},
		{
			header: t("table.issueDate"),
			accessorKey: "issueDate",
			size: 160
		},
		{
			header: t("table.amount"),
			accessorKey: "amount",
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));
				const currency = row.original.currency;
				return (
					<div className="font-medium">
						{amount.toLocaleString()} {currency}
					</div>
				);
			},
			size: 140
		},
		{
			header: t("table.paidAmount"),
			accessorKey: "paidAmount",
			cell: ({ row }) => {
				const paidAmount = parseFloat(row.getValue("paidAmount"));
				const currency = row.original.currency;
				return (
					<div className="font-medium">
						{paidAmount.toLocaleString()} {currency}
					</div>
				);
			},
			size: 140
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_INVOICE_STATUS_TYPE;

				let badgeClasses = "";
				switch (status) {
					case ENUM_INVOICE_STATUS.PAID:
						badgeClasses =
							"bg-green-500/20 text-green-700 border-green-500/50";
						break;
					case ENUM_INVOICE_STATUS.UNPAID:
						badgeClasses =
							"bg-red-500/20 text-red-700 border-red-500/50";
						break;
					case ENUM_INVOICE_STATUS.PARTIALLY_PAID:
						badgeClasses =
							"bg-yellow-500/20 text-yellow-700 border-yellow-500/50";
						break;
					default:
						badgeClasses = "";
				}

				return (
					<Badge variant="outline" className={cn(badgeClasses)}>
						{t(INVOICE_STATUS_LABELS[status])}
					</Badge>
				);
			},
			size: 160
		}
	];
};
