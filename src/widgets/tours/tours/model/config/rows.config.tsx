import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Checkbox, Skeleton } from "@/shared/ui";

import {
	type ENUM_TOUR_STATUS_TYPE,
	type ITourCard,
	TOUR_STATUS_LABELS,
	TOUR_STATUS_VARIANTS
} from "@/entities/tour";

export const COLUMNS = (): ColumnDef<ITourCard>[] => {
	const { t } = useTranslation(["tours_page", "options"]);

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
			header: t("table.title", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.title", { ns: "tours_page" }),
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
			header: t("table.route", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.route", { ns: "tours_page" }),
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
			header: t("table.type", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.type", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "type",
			cell: ({ row }) => (
				<div className="text-sm">{row.getValue("type")}</div>
			),
			size: 120
		},
		{
			header: t("table.price", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.price", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "price_from",
			cell: ({ row }) => (
				<div className="text-sm font-medium">
					${row.original.price_from} - ${row.original.price_to}
				</div>
			),
			size: 140
		},
		{
			header: t("table.status", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.status", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-5 w-[80px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue("status") as ENUM_TOUR_STATUS_TYPE;
				return (
					<Badge variant={TOUR_STATUS_VARIANTS[status]}>
						{t(TOUR_STATUS_LABELS[status], { ns: "options" })}
					</Badge>
				);
			},
			size: 120
		}
		// {
		// 	id: "actions",
		// 	header: () => <span className="sr-only">Actions</span>,
		// 	cell: () => (
		// 		<div className="flex justify-end">
		// 			<Skeleton className="size-8 rounded-md" />
		// 		</div>
		// 	),
		// 	meta: {
		// 		skeleton: <div className="size-8 rounded-md bg-muted" />
		// 	},
		// 	size: 50,
		// 	enableHiding: false
		// }
	];
};
