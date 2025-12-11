import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Checkbox } from "@/shared/ui";

import {
	type ENUM_STAFF_ROLE_OPTIONS_TYPE,
	ENUM_STAFF_STATUS_OPTIONS,
	type ENUM_STAFF_STATUS_OPTIONS_TYPE,
	type IStaffUser
} from "@/entities/staff";
import { STAFF_ROLE_LABELS, STAFF_STATUS_LABELS } from "@/entities/staff";

import { StaffActions } from "../ui/staff-actions";

export const COLUMNS = (
	onEdit?: (id: string, data: Partial<IStaffUser>) => void,
	onDelete?: (id: string) => void
): ColumnDef<IStaffUser>[] => {
	const { t } = useTranslation("staff_information_page");
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.firstName"),
			accessorKey: "firstName",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("firstName")}</div>
			),
			size: 160
		},
		{
			header: t("table.lastName"),
			accessorKey: "lastName",
			size: 160
		},
		{
			header: t("table.email"),
			accessorKey: "email",
			size: 240
		},
		{
			header: t("table.role"),
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
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_STAFF_STATUS_OPTIONS_TYPE;

				let badgeClasses = "";
				switch (status) {
					case ENUM_STAFF_STATUS_OPTIONS.ACTIVE:
						badgeClasses = " ";
						break;
					case ENUM_STAFF_STATUS_OPTIONS.INACTIVE:
						badgeClasses = "bg-red-400/60 ";
						break;
					case ENUM_STAFF_STATUS_OPTIONS.PENDING:
						badgeClasses =
							"bg-muted-foreground/60 text-primary-foreground";
						break;
					default:
						badgeClasses = "";
				}

				return (
					<Badge className={cn(badgeClasses)}>
						{STAFF_STATUS_LABELS[status]}
					</Badge>
				);
			},
			size: 120
		},
		{
			header: t("table.split"),
			accessorKey: "split",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("split")}</div>
			),
			size: 120
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => (
				<StaffActions
					user={row.original}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
			size: 60,
			enableHiding: false
		}
	];
};
