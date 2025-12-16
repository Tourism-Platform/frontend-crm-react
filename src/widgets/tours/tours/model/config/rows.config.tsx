import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox } from "@/shared/ui";

import type { ITourCard } from "@/entities/tour";

export const COLUMNS = (): ColumnDef<ITourCard>[] => {
	const { t } = useTranslation("tours_page");

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
			header: t("table.title"),
			accessorKey: "title",
			cell: ({ row }) => (
				<div className="font-medium max-w-xs truncate">
					{row.getValue("title")}
				</div>
			),
			size: 300
		},
		{
			header: t("table.route"),
			accessorKey: "route",
			cell: ({ row }) => (
				<div className="text-sm">
					{(row.getValue("route") as string[])?.join(" - ")}
				</div>
			),
			size: 200
		},
		{
			header: t("table.type"),
			accessorKey: "type",
			cell: ({ row }) => (
				<div className="text-sm">{row.getValue("type")}</div>
			),
			size: 120
		},
		{
			header: t("table.price"),
			accessorKey: "price_from",
			cell: ({ row }) => (
				<div className="text-sm font-medium">
					${row.original.price_from} - ${row.original.price_to}
				</div>
			),
			size: 140
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue("status") as string;
				return <Badge>{status}</Badge>;
			},
			size: 120
		}
	];
};
