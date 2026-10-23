import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";
import { formatDate } from "@/shared/utils";

import {
	CURRENCY_LABELS,
	type IOperatorCurrencyRate
} from "@/entities/commission";

// Курс в слабую валюту бывает вида 0.000079 — дефолтные 3 знака дали бы «0»
const formatRate = (rate: number) =>
	rate.toLocaleString(undefined, { maximumFractionDigits: 8 });

export const OPERATOR_CURRENCY_RATE_COLUMNS = (
	t: TFunction<"financial_settings_page_operator">
): ColumnDef<IOperatorCurrencyRate>[] => [
	{
		id: "select",
		size: 28,
		enableSorting: false,
		enableHiding: false
	},
	{
		header: t("currency.currency_rate.table.from_currency"),
		meta: {
			headerTitle: t("currency.currency_rate.table.from_currency"),
			skeleton: <Skeleton className="h-4 w-[160px]" />
		},
		accessorKey: "from_currency",
		cell: ({ row }) => (
			<div className="font-medium">
				{
					CURRENCY_LABELS[
						row.getValue(
							"from_currency"
						) as keyof typeof CURRENCY_LABELS
					]
				}
			</div>
		),
		size: 200
	},
	{
		header: t("currency.currency_rate.table.to_currency"),
		meta: {
			headerTitle: t("currency.currency_rate.table.to_currency"),
			skeleton: <Skeleton className="h-4 w-[160px]" />
		},
		accessorKey: "to_currency",
		cell: ({ row }) => (
			<div className="font-medium">
				{
					CURRENCY_LABELS[
						row.getValue(
							"to_currency"
						) as keyof typeof CURRENCY_LABELS
					]
				}
			</div>
		),
		size: 200
	},
	{
		header: t("currency.currency_rate.table.rate"),
		meta: {
			headerTitle: t("currency.currency_rate.table.rate"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "rate",
		cell: ({ row }) => (
			<div className="font-medium">{formatRate(row.original.rate)}</div>
		),
		size: 160
	},
	{
		header: t("currency.currency_rate.table.rate_with_margin"),
		meta: {
			headerTitle: t("currency.currency_rate.table.rate_with_margin"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "rate_with_margin",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatRate(row.original.rate_with_margin)}
			</div>
		),
		size: 160
	},
	{
		header: t("currency.currency_rate.table.rate_date"),
		meta: {
			headerTitle: t("currency.currency_rate.table.rate_date"),
			skeleton: <Skeleton className="h-4 w-[100px]" />
		},
		accessorKey: "rate_date",
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{formatDate(row.getValue("rate_date") ?? undefined) || "—"}
			</div>
		),
		size: 160
	}
];
