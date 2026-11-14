import { type ColumnDef } from "@tanstack/react-table";
import { type TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Checkbox, Skeleton } from "@/shared/ui";

import {
	type ENUM_TOUR_STATUS_TYPE,
	type ENUM_TOUR_TYPES_TYPE,
	type ITourCard,
	TOUR_CATEGORY_LABELS,
	TOUR_STATUS_LABELS,
	TOUR_STATUS_VARIANTS,
	TOUR_TYPE_LABELS,
	TOUR_TYPE_VARIANTS,
	TourCardChips,
	formatTourAge,
	formatTourGroup
} from "@/entities/tour";

/** Видно в ячейке; остальные — «+N», клик раскрывает все */
const VISIBLE_LANGUAGES = 4;
const VISIBLE_CATEGORIES = 2;

export const COLUMNS = (
	t: TFunction<"tours_page", undefined>
): ColumnDef<ITourCard>[] => {
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
				<Link
					to={buildRoute(ENUM_PATH.TOURS.OVERVIEW, {
						tourId: row.original.id
					})}
					className="block truncate font-medium text-primary hover:underline"
				>
					{row.getValue("title")}
				</Link>
			),
			size: 190
		},
		{
			id: "duration",
			header: t("table.duration", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.duration", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[90px]" />
			},
			accessorKey: "days",
			cell: ({ row }) => (
				<div className="whitespace-nowrap">
					{t("card.duration", {
						ns: "tours_page",
						days: row.original.days ?? 0,
						nights: row.original.nights ?? 0,
						daysUnit: t("tour.duration.days", { ns: "options" }),
						nightsUnit: t("tour.duration.nights", { ns: "options" })
					})}
				</div>
			),
			size: 115
		},
		{
			id: "group",
			header: t("table.group", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.group", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[50px]" />
			},
			accessorKey: "groupSizeMax",
			cell: ({ row }) =>
				formatTourGroup(
					row.original.groupSizeMin,
					row.original.groupSizeMax,
					(min, max) =>
						t("card.group", { ns: "tours_page", min, max })
				),
			size: 70
		},
		{
			id: "age",
			header: t("table.age", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.age", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[60px]" />
			},
			accessorKey: "ageFrom",
			cell: ({ row }) => (
				<div className="whitespace-nowrap">
					{formatTourAge(
						row.original.ageFrom,
						row.original.ageTo,
						(from, to) =>
							t("card.age", { ns: "tours_page", from, to })
					)}
				</div>
			),
			size: 75
		},
		{
			header: t("table.languages", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.languages", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "languages",
			cell: ({ row }) => (
				<TourCardChips
					mode="flags"
					appearance="table"
					items={row.original.languages}
					visible={VISIBLE_LANGUAGES}
				/>
			),
			enableSorting: false,
			size: 120
		},
		{
			header: t("table.categories", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.categories", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-5 w-[140px] rounded-full" />
			},
			accessorKey: "categories",
			cell: ({ row }) => (
				<TourCardChips
					mode="chips"
					appearance="table"
					items={row.original.categories.map((category) =>
						t(TOUR_CATEGORY_LABELS[category], { ns: "options" })
					)}
					visible={VISIBLE_CATEGORIES}
				/>
			),
			enableSorting: false,
			size: 200
		},
		{
			header: t("table.type", { ns: "tours_page" }),
			meta: {
				headerTitle: t("table.type", { ns: "tours_page" }),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "type",
			cell: ({ row }) => {
				const type = row.getValue("type") as ENUM_TOUR_TYPES_TYPE;
				return (
					<Badge variant={TOUR_TYPE_VARIANTS[type]}>
						{t(TOUR_TYPE_LABELS[type], { ns: "options" })}
					</Badge>
				);
			},
			size: 120
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
