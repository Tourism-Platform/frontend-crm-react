import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";
import { formatDate } from "@/shared/utils";

import {
	HOUSING_ROOM_TYPE_LABELS,
	type IProductSeasonRate
} from "@/entities/tour";

import { formatSeasonFeeLine } from "../format-season-fee-line";
import { formatSeasonRatePrice } from "../format-season-rate-price";

import {
	PRODUCT_SEASON_CHARGE_LABELS,
	PRODUCT_SEASON_EXTRA_COST_MODE_LABELS
} from "./product-season-labels.config";

export const PRODUCT_SEASON_RATE_COLUMNS = (
	t: TFunction<["common_events", "options"], undefined>
): ColumnDef<IProductSeasonRate>[] => [
	{
		id: "select",
		size: 28,
		enableSorting: false,
		enableHiding: false
	},
	{
		header: t("product_seasons.table.room"),
		meta: {
			headerTitle: t("product_seasons.table.room"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		accessorKey: "roomType",
		cell: ({ row }) => {
			const { roomName, roomType } = row.original;

			return (
				<div className="font-medium">
					{roomName ||
						(roomType
							? t(HOUSING_ROOM_TYPE_LABELS[roomType], {
									ns: "options"
								})
							: "—")}
				</div>
			);
		},
		size: 160
	},
	{
		header: t("product_seasons.table.period"),
		meta: {
			headerTitle: t("product_seasons.table.period"),
			skeleton: <Skeleton className="h-4 w-[180px]" />
		},
		accessorKey: "fromDate",
		cell: ({ row }) => (
			<div className="tabular-nums">
				{t("product_seasons.range", {
					from: formatDate(row.original.fromDate),
					to: formatDate(row.original.toDate)
				})}
			</div>
		),
		size: 220
	},
	{
		id: "price",
		header: t("product_seasons.table.price"),
		meta: {
			headerTitle: t("product_seasons.table.price"),
			skeleton: <Skeleton className="h-4 w-[140px]" />
		},
		cell: ({ row }) => (
			<div>
				<span className="font-medium tabular-nums">
					{formatSeasonRatePrice(row.original.expenses)}
				</span>{" "}
				<span className="text-muted-foreground text-xs">
					{t(PRODUCT_SEASON_CHARGE_LABELS[row.original.expenses.typ])}
				</span>
			</div>
		),
		size: 220
	},
	{
		id: "fees",
		header: t("product_seasons.table.fees"),
		meta: {
			headerTitle: t("product_seasons.table.fees"),
			skeleton: <Skeleton className="h-4 w-[160px]" />
		},
		cell: ({ row }) => {
			const { expenses, extraCosts } = row.original;
			const untitled = t("product_seasons.fees.title");
			// Без суммы — только имя
			const lines = [
				...(expenses.fees ?? []).map((fee) => {
					const { name, amount } = formatSeasonFeeLine(fee, untitled);
					return amount
						? t("product_seasons.fees.line", { name, amount })
						: name;
				}),
				...extraCosts.map((cost) => {
					const { name, amount } = formatSeasonFeeLine(
						cost,
						untitled
					);
					return amount
						? t("product_seasons.fees.line_mode", {
								name,
								amount,
								mode: t(
									PRODUCT_SEASON_EXTRA_COST_MODE_LABELS[
										cost.mode
									]
								)
							})
						: name;
				})
			];

			if (!lines.length) {
				return <span className="text-muted-foreground">—</span>;
			}

			return (
				<ul className="text-muted-foreground grid gap-0.5 text-xs">
					{lines.map((line, index) => (
						<li key={`${line}-${index}`}>{line}</li>
					))}
				</ul>
			);
		},
		size: 280
	}
];
