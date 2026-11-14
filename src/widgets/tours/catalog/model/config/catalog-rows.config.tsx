import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import {
	CATALOG_TOUR_TYPE_LABELS,
	CATALOG_TOUR_TYPE_VARIANTS,
	type ENUM_CATALOG_TOUR_TYPES_TYPE,
	type ICatalogTourCard,
	TOUR_CATEGORY_LABELS,
	TourCardChips,
	formatTourAge,
	formatTourGroup
} from "@/entities/tour";

/** Видно в ячейке; остальные — «+N», клик раскрывает все — как в таблице туров оператора */
const VISIBLE_LANGUAGES = 4;
const VISIBLE_CATEGORIES = 2;

export const CATALOG_COLUMNS = (
	t: TFunction<["tours_catalog_page", "options"], undefined>
): ColumnDef<ICatalogTourCard>[] => {
	return [
		{
			header: t("table.title", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.title", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[200px]" />
			},
			accessorKey: "title",
			cell: ({ row }) => (
				<Link
					to={buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
						tourId: row.original.id
					})}
				>
					<div className="max-w-xs truncate font-medium text-blue-500 hover:text-blue-600 hover:underline">
						{row.getValue("title")}
					</div>
				</Link>
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
				<div className="max-w-[200px] truncate text-sm">
					{(row.getValue("route") as string[])?.join(" → ")}
				</div>
			),
			size: 200
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
					{formatMoney(row.original.priceFrom, {
						currency: row.original.currency,
						compact: false
					})}
				</div>
			),
			size: 140
		},
		{
			id: "duration",
			header: t("table.duration", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.duration", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[90px]" />
			},
			accessorKey: "days",
			cell: ({ row }) => (
				<div className="whitespace-nowrap">
					{t("card.duration", {
						ns: "tours_catalog_page",
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
			header: t("table.group", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.group", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[50px]" />
			},
			accessorKey: "groupSizeMax",
			cell: ({ row }) =>
				formatTourGroup(
					row.original.groupSizeMin,
					row.original.groupSizeMax,
					(min, max) =>
						t("card.group", { ns: "tours_catalog_page", min, max })
				),
			size: 70
		},
		{
			id: "age",
			header: t("table.age", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.age", { ns: "tours_catalog_page" }),
				skeleton: <Skeleton className="h-4 w-[60px]" />
			},
			accessorKey: "ageFrom",
			cell: ({ row }) => (
				<div className="whitespace-nowrap">
					{formatTourAge(
						row.original.ageFrom,
						row.original.ageTo,
						(from, to) =>
							t("card.age", {
								ns: "tours_catalog_page",
								from,
								to
							})
					)}
				</div>
			),
			size: 75
		},
		{
			header: t("table.languages", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.languages", { ns: "tours_catalog_page" }),
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
			header: t("table.categories", { ns: "tours_catalog_page" }),
			meta: {
				headerTitle: t("table.categories", {
					ns: "tours_catalog_page"
				}),
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
					<Badge variant={CATALOG_TOUR_TYPE_VARIANTS[type]}>
						{t(CATALOG_TOUR_TYPE_LABELS[type], { ns: "options" })}
					</Badge>
				);
			},
			size: 120
		}
	];
};
