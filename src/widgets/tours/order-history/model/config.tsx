import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox, RowActions } from "@/shared/ui";

import {
	type ENUM_TOUR_ORDER_STATUS_TYPE,
	TOUR_ORDER_STATUS_LABELS,
	TOUR_ORDER_STATUS_VARIANTS
} from "@/entities/tour";
import type { IRecentOrder } from "@/entities/tour";

export const ORDER_HISTORY_COLUMNS = (): ColumnDef<IRecentOrder>[] => {
	const { t } = useTranslation("tour_order_history_page");

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
			header: t("table.order_id"),
			accessorKey: "order_id",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("order_id")}</div>
			),
			size: 140
		},
		{
			header: t("table.client"),
			accessorKey: "client",
			size: 180
		},
		{
			header: t("table.type"),
			accessorKey: "type",
			size: 120
		},
		{
			header: t("table.pax"),
			accessorKey: "pax",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("pax")}</div>
			),
			size: 80
		},
		{
			header: t("table.dates"),
			accessorKey: "dates",
			cell: ({ row }) => {
				const order = row.original;
				return (
					<div className="whitespace-nowrap">
						{order.date_from} - {order.date_to}
					</div>
				);
			},
			size: 200
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_TOUR_ORDER_STATUS_TYPE;
				return (
					<Badge variant={TOUR_ORDER_STATUS_VARIANTS[status]}>
						{t(TOUR_ORDER_STATUS_LABELS[status])}
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
