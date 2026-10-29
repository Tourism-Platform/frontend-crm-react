import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, CopyableValue, Skeleton } from "@/shared/ui";
import { formatDate, formatMoney } from "@/shared/utils";

import {
	type ILedgerEntry,
	LEDGER_ENTRY_TYPE_LABELS,
	LEDGER_ENTRY_TYPE_VARIANTS,
	LEDGER_FLOW_LABELS,
	LEDGER_PARTY_LABELS,
	LEDGER_SOURCE_LABELS
} from "@/entities/finance";

export const ENTRIES_COLUMNS = (
	t: TFunction<["ledger_page", "options"], undefined>
): ColumnDef<ILedgerEntry>[] => [
	{
		header: t("entries.table.occurred_at"),
		meta: {
			headerTitle: t("entries.table.occurred_at"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "occurredAt",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatDate(row.original.occurredAt)}
			</div>
		),
		size: 120
	},
	{
		header: t("entries.table.order"),
		meta: {
			headerTitle: t("entries.table.order"),
			skeleton: <Skeleton className="h-4 w-[100px]" />
		},
		accessorKey: "orderNumber",
		cell: ({ row }) => {
			const { bookingId, orderNumber } = row.original;
			if (!orderNumber) return <span>—</span>;

			return (
				<CopyableValue
					value={orderNumber}
					kind="number"
					to={
						bookingId
							? buildRoute(ENUM_PATH.OPERATOR.BOOKING.ORDER_ID, {
									orderId: bookingId
								})
							: undefined
					}
					className="font-medium text-primary"
				/>
			);
		},
		size: 140
	},
	{
		header: t("entries.table.type"),
		meta: {
			headerTitle: t("entries.table.type"),
			skeleton: <Skeleton className="h-6 w-[90px]" />
		},
		accessorKey: "type",
		cell: ({ row }) => (
			<Badge variant={LEDGER_ENTRY_TYPE_VARIANTS[row.original.type]}>
				{t(LEDGER_ENTRY_TYPE_LABELS[row.original.type], {
					ns: "options"
				})}
			</Badge>
		),
		size: 130
	},
	{
		header: t("entries.table.payer"),
		meta: {
			headerTitle: t("entries.table.payer"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		id: "payer",
		cell: ({ row }) => (
			<span className="font-medium">
				{t(LEDGER_PARTY_LABELS[row.original.payer.type], {
					ns: "options"
				})}
			</span>
		),
		size: 120
	},
	{
		header: t("entries.table.payee"),
		meta: {
			headerTitle: t("entries.table.payee"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		id: "payee",
		cell: ({ row }) => (
			<span className="font-medium">
				{t(LEDGER_PARTY_LABELS[row.original.payee.type], {
					ns: "options"
				})}
			</span>
		),
		size: 120
	},
	{
		header: t("entries.table.flow"),
		meta: {
			headerTitle: t("entries.table.flow"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "flow",
		cell: ({ row }) => {
			const { flow } = row.original;

			return (
				<span className="font-medium">
					{flow
						? t(LEDGER_FLOW_LABELS[flow], { ns: "options" })
						: "—"}
				</span>
			);
		},
		size: 110
	},
	{
		header: t("entries.table.source"),
		meta: {
			headerTitle: t("entries.table.source"),
			skeleton: <Skeleton className="h-4 w-[100px]" />
		},
		accessorKey: "source",
		cell: ({ row }) => (
			<span className="font-medium">
				{t(LEDGER_SOURCE_LABELS[row.original.source], {
					ns: "options"
				})}
			</span>
		),
		size: 150
	},
	{
		header: t("entries.table.amount"),
		meta: {
			headerTitle: t("entries.table.amount"),
			skeleton: <Skeleton className="h-4 w-[80px]" />
		},
		accessorKey: "amount",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatMoney(row.original.amount, {
					currency: row.original.currency
				})}
			</div>
		),
		size: 130
	},
	{
		header: t("entries.table.note"),
		meta: {
			headerTitle: t("entries.table.note"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		accessorKey: "note",
		cell: ({ row }) => (
			<div className="min-w-0 w-full">
				<span
					title={row.original.note ?? undefined}
					className="block truncate"
				>
					{row.original.note ?? "—"}
				</span>
			</div>
		),
		size: 200
	}
];
