import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, Button, Checkbox, Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_RECONCILIATION_STATUS_TYPE,
	type IReconciliation,
	RECONCILIATION_STATUS_LABELS,
	RECONCILIATION_STATUS_VARIANTS
} from "@/entities/finance";

export const COLUMNS = (): ColumnDef<IReconciliation>[] => {
	const { t } = useTranslation(["reconciliation_page", "options"]);
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
				headerTitle: t("table.id", { ns: "reconciliation_page" }),
				skeleton: <Skeleton className="h-4 w-[60px]" />
			},
			accessorKey: "id",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("id")}</div>
			),
			size: 80
		},
		{
			header: t("table.orderId"),
			meta: {
				headerTitle: t("table.orderId", { ns: "reconciliation_page" }),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "orderId",
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
			size: 140
		},
		{
			header: t("table.actualRevenue"),
			meta: {
				headerTitle: t("table.actualRevenue", {
					ns: "reconciliation_page"
				}),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "actualRevenue",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("actualRevenue"))}
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
			header: t("table.actualCost"),
			meta: {
				headerTitle: t("table.actualCost", {
					ns: "reconciliation_page"
				}),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "actualCost",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("actualCost"))}
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
				const status = row.getValue(
					"status"
				) as ENUM_RECONCILIATION_STATUS_TYPE;

				return (
					<Badge variant={RECONCILIATION_STATUS_VARIANTS[status]}>
						{t(RECONCILIATION_STATUS_LABELS[status], {
							ns: "options"
						})}
					</Badge>
				);
			},
			size: 120
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Button variant="outline" size="sm" asChild>
					<Link
						to={buildRoute(ENUM_PATH.FINANCE.RECONCILIATION_ID, {
							reconciliationId: row.original.id
						})}
					>
						{t("table.menu.open", { ns: "reconciliation_page" })}
					</Link>
				</Button>
			),
			size: 80,
			enableHiding: false
		}
	];
};
