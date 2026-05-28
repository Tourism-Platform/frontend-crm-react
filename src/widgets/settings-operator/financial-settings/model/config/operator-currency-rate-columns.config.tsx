import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";

import {
	CURRENCY_LABELS,
	type IOperatorCurrencyRate
} from "@/entities/commission";

import { FinancialActions } from "../../ui";

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
			<div className="font-medium">
				{(row.getValue("rate") as number).toLocaleString()}
			</div>
		),
		size: 160
	},
	{
		id: "actions",
		header: () => <span className="sr-only">Actions</span>,
		cell: ({ row }) => <FinancialActions row={row.original} />,
		meta: {
			skeleton: <div className="size-9 rounded-md" />
		},
		size: 60,
		enableHiding: false
	}
];
