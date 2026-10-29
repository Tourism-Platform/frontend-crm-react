import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import {
	type ICounterpartyBalance,
	LEDGER_PARTY_LABELS
} from "@/entities/finance";

export const BALANCES_COLUMNS = (
	t: TFunction<["ledger_page", "options"], undefined>
): ColumnDef<ICounterpartyBalance>[] => [
	{
		header: t("balances.table.party"),
		meta: {
			headerTitle: t("balances.table.party"),
			skeleton: <Skeleton className="h-4 w-[180px]" />
		},
		accessorKey: "partyName",
		cell: ({ row }) => {
			const { party, partyName } = row.original;
			const name =
				partyName ??
				t(LEDGER_PARTY_LABELS[party.type], { ns: "options" });

			return (
				<div className="min-w-0 w-full">
					<span title={name} className="block truncate font-medium">
						{name}
					</span>
				</div>
			);
		},
		size: 260
	},
	{
		header: t("balances.table.billed"),
		meta: {
			headerTitle: t("balances.table.billed"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "billed",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatMoney(row.original.billed, {
					currency: row.original.currency
				})}
			</div>
		),
		size: 150
	},
	{
		header: t("balances.table.paid"),
		meta: {
			headerTitle: t("balances.table.paid"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "paid",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatMoney(row.original.paid, {
					currency: row.original.currency
				})}
			</div>
		),
		size: 150
	},
	{
		header: t("balances.table.outstanding"),
		meta: {
			headerTitle: t("balances.table.outstanding"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "outstanding",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatMoney(row.original.outstanding, {
					currency: row.original.currency
				})}
			</div>
		),
		size: 150
	}
];
