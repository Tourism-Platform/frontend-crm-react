import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Checkbox, CopyableValue, Skeleton } from "@/shared/ui";
import { formatCompactAmount } from "@/shared/utils";

import {
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPayment,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	SUPPLIER_PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";
import { getEventKindLabelKey } from "@/entities/tour/itinerary";

import { ConfirmPayment } from "@/features/finance";

export const COLUMNS = (
	t: TFunction<["supplier_payments_page", "options"], undefined>
): ColumnDef<ISupplierPayment>[] => {
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
				<CopyableValue
					value={row.original.id}
					kind="uuid"
					className="font-medium"
				/>
			),
			size: 200
		},
		{
			header: t("table.orderId"),
			meta: {
				headerTitle: t("table.orderId"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "orderId",
			cell: ({ row }) => {
				const { bookingId, orderId } = row.original;

				if (!bookingId) {
					return (
						<CopyableValue
							value={orderId}
							kind="number"
							className="font-medium"
						/>
					);
				}

				return (
					<CopyableValue
						value={orderId}
						kind="number"
						to={buildRoute(ENUM_PATH.OPERATOR.BOOKING.ORDER_ID, {
							orderId: bookingId
						})}
						className="font-medium text-primary"
					/>
				);
			},
			size: 120
		},
		{
			header: t("table.component"),
			meta: {
				headerTitle: t("table.component"),
				skeleton: <Skeleton className="h-4 w-[180px]" />
			},
			accessorKey: "component",
			cell: ({ row }) => (
				<div className="min-w-0 w-full">
					<span
						title={row.original.component}
						className="block truncate font-medium"
					>
						{row.getValue("component")}
					</span>
				</div>
			),
			size: 200
		},
		{
			header: t("table.type"),
			meta: {
				headerTitle: t("table.type"),
				skeleton: <Skeleton className="h-4 w-[150px]" />
			},
			accessorKey: "type",
			cell: ({ row }) => {
				const labelKey = getEventKindLabelKey(row.original.eventKind);
				const label = labelKey
					? t(labelKey, { ns: "options" })
					: (row.getValue("type") as string);

				return <div className="font-medium">{label}</div>;
			},
			size: 100
		},
		{
			header: t("table.supplier"),
			meta: {
				headerTitle: t("table.supplier"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "supplier",
			cell: ({ row }) => (
				<div className="min-w-0 w-full">
					<span
						title={row.original.supplier}
						className="block truncate font-medium"
					>
						{row.getValue("supplier")}
					</span>
				</div>
			),
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
			cell: ({ row }) => {
				const { amount, currency } = row.original;
				return (
					<div className="font-medium">
						{`${currency} ${formatCompactAmount(amount)}`}
					</div>
				);
			},
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
