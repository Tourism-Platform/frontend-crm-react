import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { USER_ROLE_LABELS } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";
import { formatSheetDate } from "@/shared/utils";

import type { IAuditLog } from "@/entities/audit";
import { PERMISSION_LABELS } from "@/entities/staff";

export const COLUMNS = (
	t: TFunction<["audit_log_page", "options"], undefined>
): ColumnDef<IAuditLog>[] => [
	{
		header: t("table.created_at"),
		meta: {
			headerTitle: t("table.created_at"),
			skeleton: <Skeleton className="h-4 w-[120px]" />
		},
		accessorKey: "createdAt",
		cell: ({ row }) => (
			<div className="font-medium">
				{formatSheetDate(row.original.createdAt, "d MMM yyyy, HH:mm")}
			</div>
		),
		size: 160
	},
	{
		header: t("table.user"),
		meta: {
			headerTitle: t("table.user"),
			skeleton: <Skeleton className="h-4 w-[160px]" />
		},
		id: "user",
		cell: ({ row }) => {
			const { displayName, email } = row.original;

			return (
				<div className="flex min-w-0 flex-col">
					<span className="truncate font-medium">
						{displayName ?? email ?? "—"}
					</span>
					{displayName && email && (
						<span className="truncate text-xs text-muted-foreground">
							{email}
						</span>
					)}
				</div>
			);
		},
		size: 220
	},
	{
		header: t("table.role"),
		meta: {
			headerTitle: t("table.role"),
			skeleton: <Skeleton className="h-4 w-[100px]" />
		},
		accessorKey: "role",
		cell: ({ row }) => (
			<span className="font-medium">
				{t(USER_ROLE_LABELS[row.original.role], { ns: "options" })}
			</span>
		),
		size: 140
	},
	{
		header: t("table.request"),
		meta: {
			headerTitle: t("table.request"),
			skeleton: <Skeleton className="h-4 w-[200px]" />
		},
		id: "request",
		cell: ({ row }) => {
			const request = `${row.original.method} ${row.original.path}`;

			return (
				<div className="min-w-0 w-full">
					<span
						title={request}
						className="block truncate font-mono text-sm"
					>
						{request}
					</span>
				</div>
			);
		},
		size: 260
	},
	{
		header: t("table.permission"),
		meta: {
			headerTitle: t("table.permission"),
			skeleton: <Skeleton className="h-4 w-[140px]" />
		},
		accessorKey: "permission",
		cell: ({ row }) => {
			const { permission } = row.original;

			return (
				<span className="font-medium">
					{permission
						? t(PERMISSION_LABELS[permission], { ns: "options" })
						: "—"}
				</span>
			);
		},
		size: 200
	},
	{
		header: t("table.status"),
		meta: {
			headerTitle: t("table.status"),
			skeleton: <Skeleton className="h-6 w-[50px]" />
		},
		accessorKey: "statusCode",
		cell: ({ row }) => {
			const { statusCode } = row.original;

			return (
				<Badge variant={statusCode < 400 ? "green" : "red"}>
					{statusCode}
				</Badge>
			);
		},
		size: 90
	}
];
