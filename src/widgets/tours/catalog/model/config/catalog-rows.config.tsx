import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Skeleton } from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import {
	CATALOG_TOUR_TYPE_LABELS,
	type ENUM_CATALOG_TOUR_TYPES_TYPE,
	type ICatalogTourCard
} from "@/entities/tour";

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
					{formatMoney(row.original.priceFrom, {
						currency: row.original.currency,
						compact: false
					})}
				</div>
			),
			size: 140
		}
	];
};
