import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, type BadgeVariant, Checkbox } from "@/shared/ui";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPayment
} from "@/entities/finance";

import { ConfirmPayment } from "@/features/finance";
import type { TConfirmPaymentSchema } from "@/features/finance";

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
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));
				return (
					<div className="font-medium">
						${amount.toLocaleString()}
					</div>
				);
			},
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

				let variant: BadgeVariant = "default";
				switch (status) {
					case ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED:
						variant = "green";
						break;
					case ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED:
						variant = "yellow";
						break;
					default:
						variant = "default";
				}

				return (
					<Badge variant={variant}>
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
