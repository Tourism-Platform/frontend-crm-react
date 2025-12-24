import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_PAYMENT_STATUS_TYPE,
	type IPayment,
	PAYMENT_STATUS_LABELS,
	PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";

import { ClientPaymentActions } from "../ui";

export const COLUMNS = (
	onAssign?: (id: string, data: Partial<IPayment>) => void,
	onDelete?: (id: string) => void
): ColumnDef<IPayment>[] => {
	const { t } = useTranslation("client_payments_page");
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
			header: t("table.dateCreated"),
			accessorKey: "dateCreated",
			size: 160
		},
		{
			header: t("table.amount"),
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
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_PAYMENT_STATUS_TYPE;

				return (
					<Badge variant={PAYMENT_STATUS_VARIANTS[status]}>
						{t(PAYMENT_STATUS_LABELS[status])}
					</Badge>
				);
			},
			size: 160
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => (
				<ClientPaymentActions
					payment={row.original}
					onAssign={onAssign}
					onDelete={onDelete}
				/>
			),
			size: 60,
			enableHiding: false
		}
	];
};
