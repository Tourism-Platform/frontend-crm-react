import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox, Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_PAYMENT_STATUS_TYPE,
	type IPayment,
	PAYMENT_STATUS_LABELS,
	PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";

import { ClientPaymentActions } from "../ui";

export const COLUMNS = (): ColumnDef<IPayment>[] => {
	const { t } = useTranslation(["client_payments_page", "options"]);
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
			header: t("table.paymentId", { ns: "client_payments_page" }),
			meta: {
				headerTitle: t("table.paymentId", {
					ns: "client_payments_page"
				}),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "paymentId",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("paymentId")}</div>
			),
			size: 160
		},
		{
			header: t("table.orderId", { ns: "client_payments_page" }),
			meta: {
				headerTitle: t("table.orderId", { ns: "client_payments_page" }),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "orderId",
			size: 160
		},
		{
			header: t("table.dateCreated", { ns: "client_payments_page" }),
			meta: {
				headerTitle: t("table.dateCreated", {
					ns: "client_payments_page"
				}),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "dateCreated",
			size: 160
		},
		{
			header: t("table.amount", { ns: "client_payments_page" }),
			meta: {
				headerTitle: t("table.amount", { ns: "client_payments_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "amount",
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));
				return (
					<div className="font-medium">{formatToDollars(amount)}</div>
				);
			},
			size: 140
		},
		{
			header: t("table.status", { ns: "client_payments_page" }),
			meta: {
				headerTitle: t("table.status", { ns: "client_payments_page" }),
				skeleton: <Skeleton className="h-5 w-[100px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_PAYMENT_STATUS_TYPE;

				return (
					<Badge variant={PAYMENT_STATUS_VARIANTS[status]}>
						{t(PAYMENT_STATUS_LABELS[status], { ns: "options" })}
					</Badge>
				);
			},
			size: 160
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => <ClientPaymentActions payment={row.original} />,
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 60,
			enableHiding: false
		}
	];
};
