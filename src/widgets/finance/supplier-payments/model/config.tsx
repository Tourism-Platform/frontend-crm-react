import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox, Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPayment,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	SUPPLIER_PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";

import { ConfirmPayment } from "@/features/finance";

export const COLUMNS = (): ColumnDef<ISupplierPayment>[] => {
	const { t } = useTranslation(["supplier_payments_page", "options"]);

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
			meta: {
				headerTitle: t("table.id"),
				skeleton: <Skeleton className="h-4 w-[40px]" />
			},
			accessorKey: "id",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("id")}</div>
			),
			size: 60
		},
		{
			header: t("table.orderId"),
			meta: {
				headerTitle: t("table.orderId"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "orderId",
			size: 120
		},
		{
			header: t("table.component"),
			meta: {
				headerTitle: t("table.component"),
				skeleton: <Skeleton className="h-4 w-[180px]" />
			},
			accessorKey: "component",
			size: 200
		},
		{
			header: t("table.type"),
			meta: {
				headerTitle: t("table.type"),
				skeleton: <Skeleton className="h-4 w-[150px]" />
			},
			accessorKey: "type",
			size: 180
		},
		{
			header: t("table.supplier"),
			meta: {
				headerTitle: t("table.supplier"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "supplier",
			size: 140
		},
		{
			header: t("table.dateCreated"),
			meta: {
				headerTitle: t("table.dateCreated"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "dateCreated",
			size: 120
		},
		{
			header: t("table.amount"),
			meta: {
				headerTitle: t("table.amount"),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
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
			meta: {
				headerTitle: t("table.manager"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "manager",
			size: 120
		},
		{
			header: t("table.status"),
			meta: {
				headerTitle: t("table.status"),
				skeleton: <Skeleton className="h-5 w-[80px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;

				return (
					<Badge variant={SUPPLIER_PAYMENT_STATUS_VARIANTS[status]}>
						{t(SUPPLIER_PAYMENT_STATUS_LABELS[status], {
							ns: "options"
						})}
					</Badge>
				);
			},
			size: 120
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => {
				const payment = row.original;
				return <ConfirmPayment payment={payment} />;
			},
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 120,
			enableHiding: false
		}
	];
};
