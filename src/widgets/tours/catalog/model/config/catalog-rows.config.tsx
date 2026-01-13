import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox, Skeleton } from "@/shared/ui";

import {
	CATALOG_TOUR_STATUS_LABELS,
	CATALOG_TOUR_STATUS_VARIANTS,
	CATALOG_TOUR_TYPE_LABELS,
	type ENUM_CATALOG_TOUR_STATUS_TYPE,
	type ENUM_CATALOG_TOUR_TYPES_TYPE,
	type ICatalogTourCard
} from "@/entities/tour";

export const CATALOG_COLUMNS = (): ColumnDef<ICatalogTourCard>[] => {
	const { t } = useTranslation(["tours_catalog_page", "options"]);

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
			meta: {
				skeleton: <Skeleton className="size-4 rounded" />
			},
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.title", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.title", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[200px]" />
			},
			accessorKey: "title",
			cell: ({ row }) => (
				<div className="font-medium max-w-xs truncate">
					{row.getValue("title")}
				</div>
			),
			size: 300
		},
		{
			header: t("table.route", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.route", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[150px]" />
			},
			accessorKey: "route",
			cell: ({ row }) => (
				<div className="text-sm">
					{(row.getValue("route") as string[])?.join(" - ")}
				</div>
			),
			size: 200
		},
		{
			header: t("table.type", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.type", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "type",
			cell: ({ row }) => {
				const type = row.getValue(
					"type"
				) as ENUM_CATALOG_TOUR_TYPES_TYPE;
				return (
					<div className="text-sm">
						{t(CATALOG_TOUR_TYPE_LABELS[type], { ns: "options" })}
					</div>
				);
			},
			size: 120
		},
		{
			header: t("table.price", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.price", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "priceFrom",
			cell: ({ row }) => (
				<div className="text-sm font-medium">
					${row.original.priceFrom} - ${row.original.priceTo}
				</div>
			),
			size: 140
		},
		{
			header: t("table.status", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.status", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-5 w-[80px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_CATALOG_TOUR_STATUS_TYPE;
				return (
					<Badge variant={CATALOG_TOUR_STATUS_VARIANTS[status]}>
						{t(CATALOG_TOUR_STATUS_LABELS[status], {
							ns: "options"
						})}
					</Badge>
				);
			},
			size: 120
		}
	];
};
