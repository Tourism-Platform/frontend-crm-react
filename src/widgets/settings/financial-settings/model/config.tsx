import { type ColumnDef } from "@tanstack/react-table";
import { type TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";

import {
	CURRENCY_LABELS,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	type ICommission
} from "@/entities/commission";

import { FinancialActions } from "../ui";

export const COLUMNS = (
	t: TFunction<"financial_settings_page", undefined>
): ColumnDef<ICommission>[] => {
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("commission_type.table.currency"),
			meta: {
				headerTitle: t("commission_type.table.currency"),
				skeleton: <Skeleton className="h-4 w-[160px]" />
			},
			accessorKey: "name",
			cell: ({ row }) => (
				<div className="font-medium">
					{
						CURRENCY_LABELS[
							row.getValue("name") as ENUM_CURRENCY_OPTIONS_TYPE
						]
					}
				</div>
			),
			size: 200
		},
		{
			header: t("commission_type.table.rate"),
			meta: {
				headerTitle: t("commission_type.table.rate"),
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
};
