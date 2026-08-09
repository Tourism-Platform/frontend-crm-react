import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, Checkbox, Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type ENUM_ORDER_STATUS_TYPE } from "@/entities/booking/order/types/order-status.types";
import {
	type IReconciliation,
	RECONCILIATION_STATUS_LABELS,
	RECONCILIATION_STATUS_VARIANTS
} from "@/entities/finance";

export const COLUMNS = (
	t: TFunction<["reconciliation_page", "options"], undefined>
): ColumnDef<IReconciliation>[] => {
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
			header: t("table.orderId"),
			meta: {
				headerTitle: t("table.orderId", { ns: "reconciliation_page" }),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "orderId",
			cell: ({ row }) => {
				const { bookingId, orderId } = row.original;

				if (!bookingId) {
					return <div className="font-medium">{orderId}</div>;
				}

				return (
					<Link
						to={buildRoute(ENUM_PATH.FINANCE.RECONCILIATION_ID, {
							bookingId
						})}
						className="font-medium text-primary hover:underline"
					>
						{orderId}
					</Link>
				);
			},
			size: 120
		},
		{
			header: t("table.client"),
			meta: {
				headerTitle: t("table.client", { ns: "reconciliation_page" }),
				skeleton: <Skeleton className="h-4 w-[150px]" />
			},
			accessorKey: "client",
			size: 200
		},
		{
			header: t("table.plannedRevenue"),
			meta: {
				headerTitle: t("table.plannedRevenue", {
					ns: "reconciliation_page"
				}),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "plannedRevenue",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("plannedRevenue"))}
				</div>
			),
			size: 100
		},
		{
			header: t("table.revenueAccrued"),
			meta: {
				headerTitle: t("table.revenueAccrued", {
					ns: "reconciliation_page"
				}),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "revenueAccrued",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("revenueAccrued"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.plannedCost"),
			meta: {
				headerTitle: t("table.plannedCost", {
					ns: "reconciliation_page"
				}),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "plannedCost",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("plannedCost"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.costAccrued"),
			meta: {
				headerTitle: t("table.costAccrued", {
					ns: "reconciliation_page"
				}),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "costAccrued",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("costAccrued"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.variance"),
			meta: {
				headerTitle: t("table.variance", { ns: "reconciliation_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "variance",
			cell: ({ row }) => {
				const variance = parseFloat(row.getValue("variance"));
				return (
					<div
						className={cn(
							"font-medium",
							variance < 0 ? "text-red-500" : "text-green-500"
						)}
					>
						{formatToDollars(variance)}
					</div>
				);
			},
			size: 120
		},
		{
			header: t("table.status"),
			meta: {
				headerTitle: t("table.status", { ns: "reconciliation_page" }),
				skeleton: <Skeleton className="h-5 w-[100px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue("status") as ENUM_ORDER_STATUS_TYPE;

				return (
					<Badge variant={RECONCILIATION_STATUS_VARIANTS[status]}>
						{t(RECONCILIATION_STATUS_LABELS[status], {
							ns: "options"
						})}
					</Badge>
				);
			},
			size: 120
		}
	];
};
