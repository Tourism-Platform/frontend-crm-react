import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_INVOICE_STATUS_TYPE,
	type IInvoice,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS
} from "@/entities/finance";

export const COLUMNS = (): ColumnDef<IInvoice>[] => {
	const { t } = useTranslation(["invoices_page", "options"]);
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.paymentId"),
			meta: {
				headerTitle: t("table.paymentId", { ns: "invoices_page" }),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "paymentId",
			cell: ({ row }) => (
				<Link
					to={buildRoute(ENUM_PATH.FINANCE.INVOICE_ID, {
						invoiceId: row.getValue("paymentId")
					})}
					className="font-medium text-primary hover:underline"
				>
					{row.getValue("paymentId")}
				</Link>
			),
			size: 160
		},
		{
			header: t("table.orderId"),
			meta: {
				headerTitle: t("table.orderId", { ns: "invoices_page" }),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "orderId",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("orderId")}</div>
			),
			size: 160
		},
		{
			header: t("table.issueDate"),
			meta: {
				headerTitle: t("table.issueDate", { ns: "invoices_page" }),
				skeleton: <Skeleton className="h-4 w-[140px]" />
			},
			accessorKey: "issueDate",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("issueDate")}</div>
			),
			size: 160
		},
		{
			header: t("table.amount"),
			meta: {
				headerTitle: t("table.amount", { ns: "invoices_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
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
			meta: {
				headerTitle: t("table.paidAmount", { ns: "invoices_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
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
			meta: {
				headerTitle: t("table.status"),
				skeleton: <Skeleton className="h-5 w-[100px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_INVOICE_STATUS_TYPE;

				return (
					<Badge variant={INVOICE_STATUS_VARIANTS[status]}>
						{t(INVOICE_STATUS_LABELS[status], { ns: "options" })}
					</Badge>
				);
			},
			size: 160
		}
	];
};
