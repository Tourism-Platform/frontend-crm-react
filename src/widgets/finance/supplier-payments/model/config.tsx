import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPayment,
	SUPPLIER_PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";

import type { TConfirmPaymentSchema } from "@/features/finance";
import { ConfirmPayment } from "@/features/finance";

export const COLUMNS = (
	onConfirm?: (id: string, data: Partial<TConfirmPaymentSchema>) => void
): ColumnDef<ISupplierPayment>[] => {
	const { t } = useTranslation("supplier_payments_page");
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
			header: t("table.id"),
			accessorKey: "id",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("id")}</div>
			),
			size: 60
		},
		{
			header: t("table.orderId"),
			accessorKey: "orderId",
			size: 120
		},
		{
			header: t("table.component"),
			accessorKey: "component",
			size: 200
		},
		{
			header: t("table.type"),
			accessorKey: "type",
			size: 180
		},
		{
			header: t("table.supplier"),
			accessorKey: "supplier",
			size: 140
		},
		{
			header: t("table.dateCreated"),
			accessorKey: "dateCreated",
			size: 120
		},
		{
			header: t("table.amount"),
			accessorKey: "amount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("amount"))}
				</div>
			),
			size: 120
		},
		{
			header: t("table.manager"),
			accessorKey: "manager",
			size: 120
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;

				return (
					<Badge variant={SUPPLIER_PAYMENT_STATUS_VARIANTS[status]}>
						{t(`table.statuses.${status}`)}
					</Badge>
				);
			},
			size: 120
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const payment = row.original;
				return (
					<ConfirmPayment payment={payment} onConfirm={onConfirm} />
				);
			},
			size: 120,
			enableHiding: false
		}
	];
};
