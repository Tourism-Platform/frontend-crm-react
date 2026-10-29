import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import type { IPriceMatrixRow } from "@/entities/tour";

export const PRICING_REVIEW_MATRIX_COLUMNS = (
	t: TFunction<"tour_pricing_review_page", undefined>
): ColumnDef<IPriceMatrixRow>[] => [
	{
		id: "pax",
		header: t("matrix.pax"),
		meta: {
			headerTitle: t("matrix.pax"),
			skeleton: <Skeleton className="h-4 w-[60px]" />
		},
		cell: ({ row }) => (
			<div className="font-medium">
				{row.original.paxFrom} – {row.original.paxTo}
			</div>
		),
		size: 100
	},
	{
		id: "cost",
		header: t("matrix.cost"),
		meta: {
			headerTitle: t("matrix.cost"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		cell: ({ row }) => (
			<div className="font-medium">
				{formatToDollars(row.original.cost.from)} -{" "}
				{formatToDollars(row.original.cost.to)}
			</div>
		),
		size: 200
	},
	{
		id: "profit",
		header: t("matrix.profit"),
		meta: {
			headerTitle: t("matrix.profit"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		cell: ({ row }) => (
			<div className="font-medium">
				{formatToDollars(row.original.profit.from)} -{" "}
				{formatToDollars(row.original.profit.to)}
			</div>
		),
		size: 200
	},
	{
		id: "revenue",
		header: t("matrix.revenue"),
		meta: {
			headerTitle: t("matrix.revenue"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		cell: ({ row }) => (
			<div className="font-medium">
				{formatToDollars(row.original.revenue.from)} -{" "}
				{formatToDollars(row.original.revenue.to)}
			</div>
		),
		size: 200
	},
	{
		id: "perPerson",
		header: t("matrix.per_person"),
		meta: {
			headerTitle: t("matrix.per_person"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		cell: ({ row }) => (
			<div className="font-medium">
				{formatToDollars(row.original.perPerson.from)} -{" "}
				{formatToDollars(row.original.perPerson.to)}
			</div>
		),
		size: 200
	}
];
