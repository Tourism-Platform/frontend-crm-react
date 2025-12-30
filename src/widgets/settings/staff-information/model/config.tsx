import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, Skeleton } from "@/shared/ui";

import {
	type ENUM_STAFF_ROLE_OPTIONS_TYPE,
	type ENUM_STAFF_STATUS_OPTIONS_TYPE,
	type IStaffUser,
	STAFF_ROLE_LABELS,
	STAFF_STATUS_LABELS,
	STAFF_STATUS_VARIANTS
} from "@/entities/staff";

import { StaffActions } from "../ui";

export const COLUMNS = (): ColumnDef<IStaffUser>[] => {
	const { t } = useTranslation("staff_information_page");
	const { t: tOptions } = useTranslation("options");
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.firstName"),
			meta: {
				headerTitle: t("table.firstName"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "first_name",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("first_name")}</div>
			),
			size: 160
		},
		{
			header: t("table.lastName"),
			meta: {
				headerTitle: t("table.lastName"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "last_name",
			size: 160
		},
		{
			header: t("table.email"),
			meta: {
				headerTitle: t("table.email"),
				skeleton: <Skeleton className="h-4 w-[200px]" />
			},
			accessorKey: "email",
			size: 240
		},
		{
			header: t("table.role"),
			meta: {
				headerTitle: t("table.role"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			accessorKey: "role",
			cell: ({ row }) => (
				<div className="font-medium">
					{
						STAFF_ROLE_LABELS[
							row.getValue("role") as ENUM_STAFF_ROLE_OPTIONS_TYPE
						]
					}
				</div>
			),
			size: 180
		},
		{
			header: t("table.status"),
			meta: {
				headerTitle: t("table.status"),
				skeleton: <Skeleton className="h-5 w-[80px] rounded-full" />
			},
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_STAFF_STATUS_OPTIONS_TYPE;

				return (
					<Badge variant={STAFF_STATUS_VARIANTS[status]}>
						{tOptions(STAFF_STATUS_LABELS[status])}
					</Badge>
				);
			},
			size: 120
		},
		{
			header: t("table.split"),
			meta: {
				headerTitle: t("table.split"),
				skeleton: <Skeleton className="h-4 w-[40px]" />
			},
			accessorKey: "split",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("split")}</div>
			),
			size: 120
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => <StaffActions user={row.original} />,
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 60,
			enableHiding: false
		}
	];
};
