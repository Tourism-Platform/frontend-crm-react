import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib";
import { Badge, Button, Skeleton } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPayment,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	SUPPLIER_PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";
import { EVENT_METADATA } from "@/entities/tour";
import {
	type ENUM_EVENT_BACKEND_TYPE,
	EVENT_BACKEND_TYPE_LABELS,
	mapBackendTypToEventType
} from "@/entities/tour/itinerary";

import { ConfirmPayment } from "@/features/finance";

export const SUPPLIER_PAYMENTS_COLUMNS = (
	t: TFunction<["order_id_page", "options"], undefined>
): ColumnDef<ISupplierPayment>[] => {
	return [
		{
			header: t("supplier_payments.table.component"),
			meta: {
				headerTitle: t("supplier_payments.table.component"),
				skeleton: <Skeleton className="h-4 w-[180px]" />
			},
			accessorKey: "component",
			cell: ({
				row: {
					original: { type },
					depth,
					getCanExpand,
					getIsExpanded,
					getToggleExpandedHandler
				},
				getValue
			}) => {
				const hasSubRows = getCanExpand();
				const eventType = mapBackendTypToEventType(
					type as ENUM_EVENT_BACKEND_TYPE
				);
				const metadata = eventType ? EVENT_METADATA[eventType] : null;
				const Icon = metadata?.icon;
				const title = getValue() as string;

				return (
					<div
						className="flex w-full min-w-0 items-center gap-2"
						style={{ paddingLeft: `${depth * 2}rem` }}
					>
						{hasSubRows ? (
							<Button
								onClick={getToggleExpandedHandler()}
								variant="ghost"
								size="icon"
								className="shrink-0"
							>
								{getIsExpanded() ? (
									<ChevronDown className="size-4 text-muted-foreground" />
								) : (
									<ChevronRight className="size-4 text-muted-foreground" />
								)}
							</Button>
						) : (
							<div className="w-9 shrink-0" />
						)}
						<div
							className={cn(
								"size-8 rounded-full flex items-center justify-center text-white shrink-0",
								metadata?.color_bg || "bg-slate-200"
							)}
						>
							{Icon && <Icon className="size-4" />}
						</div>
						<span
							title={title}
							className="min-w-0 truncate font-medium"
						>
							{title}
						</span>
					</div>
				);
			},
			size: 200
		},
		{
			header: t("supplier_payments.table.type"),
			meta: {
				headerTitle: t("supplier_payments.table.type"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "type",
			cell: ({ row }) => {
				const type = row.getValue("type") as string;
				const labelKey =
					EVENT_BACKEND_TYPE_LABELS[type as ENUM_EVENT_BACKEND_TYPE];

				return (
					<div className="font-medium">
						{labelKey ? t(labelKey, { ns: "options" }) : type}
					</div>
				);
			},
			size: 120
		},
		{
			header: t("supplier_payments.table.supplier"),
			meta: {
				headerTitle: t("supplier_payments.table.supplier"),
				skeleton: <Skeleton className="h-4 w-[140px]" />
			},
			accessorKey: "supplier",
			cell: ({ row }) => (
				<div className="min-w-0 w-full">
					<span
						title={row.original.supplier}
						className="block truncate font-medium"
					>
						{row.getValue("supplier")}
					</span>
				</div>
			),
			size: 160
		},
		{
			header: t("supplier_payments.table.amount"),
			meta: {
				headerTitle: t("supplier_payments.table.amount"),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			accessorKey: "amount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.original.amount)}
				</div>
			),
			size: 120
		},
		{
			header: t("supplier_payments.table.confirmation"),
			meta: {
				headerTitle: t("supplier_payments.table.confirmation"),
				skeleton: <Skeleton className="h-4 w-[140px]" />
			},
			accessorKey: "files",
			cell: ({ row }) => {
				const file = row.original.files?.[0];

				if (!file) {
					return <div>-</div>;
				}

				return (
					<a
						href={file.url}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2 text-primary hover:underline truncate"
					>
						{file.name}
					</a>
				);
			},
			size: 160
		},
		{
			header: t("supplier_payments.table.paidAt"),
			meta: {
				headerTitle: t("supplier_payments.table.paidAt"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "dateCreated",
			cell: ({ row }) => (
				<div className="font-medium">
					{row.original.dateCreated || "-"}
				</div>
			),
			size: 120
		},
		{
			header: t("supplier_payments.table.status"),
			meta: {
				headerTitle: t("supplier_payments.table.status"),
				skeleton: <Skeleton className="h-5 w-[80px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;

				return (
					<Badge variant={SUPPLIER_PAYMENT_STATUS_VARIANTS[status]}>
						{t(SUPPLIER_PAYMENT_STATUS_LABELS[status], {
							ns: "options"
						})}
					</Badge>
				);
			},
			size: 120
		},
		{
			id: "actions",
			header: () => (
				<span className="sr-only">
					{t("supplier_payments.table.actions")}
				</span>
			),
			cell: ({ row }) => <ConfirmPayment payment={row.original} />,
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 120,
			enableHiding: false
		}
	];
};
