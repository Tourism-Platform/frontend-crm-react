import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Checkbox, RowActions } from "@/shared/ui";

import type { ITourOrder } from "@/entities/tour";

export const RECENT_ORDERS_COLUMNS = (): ColumnDef<ITourOrder>[] => {
	const { t } = useTranslation("tour_overview_page");

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
			header: t("recent_orders.table.order_id"),
			accessorKey: "order_id",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("order_id")}</div>
			),
			size: 140
		},
		{
			header: t("recent_orders.table.client"),
			accessorKey: "client",
			size: 180
		},
		{
			header: t("recent_orders.table.type"),
			accessorKey: "type",
			size: 120
		},
		{
			header: t("recent_orders.table.pax"),
			accessorKey: "pax",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("pax")}</div>
			),
			size: 80
		},
		{
			header: t("recent_orders.table.dates"),
			accessorKey: "dates",
			cell: ({ row }) => {
				const order = row.original;
				return (
					<div className="whitespace-nowrap">
						{order.dates.from} - {order.dates.to}
					</div>
				);
			},
			size: 200
		},
		{
			header: t("recent_orders.table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue("status") as string;
				return (
					<Badge
						className={cn({
							"bg-green-500/10 text-green-500":
								status === "confirmed",
							"bg-yellow-500/10 text-yellow-500":
								status === "pending",
							"bg-blue-500/10 text-blue-500":
								status === "completed",
							"bg-red-500/10 text-red-500": status === "cancelled"
						})}
					>
						{status}
					</Badge>
				);
			},
			size: 120
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: () => <RowActions />,
			size: 60,
			enableHiding: false
		}
	];
};
