import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, type BadgeVariant, Button, Checkbox } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	ENUM_RECONCILIATION_STATUS,
	type ENUM_RECONCILIATION_STATUS_TYPE,
	type IReconciliation
} from "@/entities/finance";

export const COLUMNS = (): ColumnDef<IReconciliation>[] => {
	const { t } = useTranslation("reconciliation_page");
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
			header: t("table.client"),
			accessorKey: "client",
			size: 200
		},
		{
			header: t("table.plannedRevenue"),
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
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_RECONCILIATION_STATUS_TYPE;

				let variant: BadgeVariant = "default";
				switch (status) {
					case ENUM_RECONCILIATION_STATUS.COMPLETED:
						variant = "green";
						break;
					case ENUM_RECONCILIATION_STATUS.IN_PROGRESS:
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
			cell: ({ row }) => (
				<Button variant="outline" size="sm" asChild>
					<Link
						to={ENUM_PATH.FINANCE.RECONCILIATION_ID.replace(
							":reconciliationId",
							row.original.id
						)}
					>
						{t("table.menu.open")}
					</Link>
				</Button>
			),
			size: 80,
			enableHiding: false
		}
	];
};
