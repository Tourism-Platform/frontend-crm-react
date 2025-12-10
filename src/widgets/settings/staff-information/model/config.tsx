import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Checkbox } from "@/shared/ui";

import { StaffActions } from "../ui/staff-actions";

import type { IUser } from "./types";

export const COLUMNS = (): ColumnDef<IUser>[] => {
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
			size: 180
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => (
				<Badge
					className={cn(
						row.getValue("status") === "Inactive" &&
							"bg-muted-foreground/60 text-primary-foreground"
					)}
				>
					{row.getValue("status")}
				</Badge>
			),
			size: 120
		},
		{
			header: t("table.split"),
			accessorKey: "split",
			cell: ({ row }) => {
				const value = row.getValue("split");
				return value === null
					? "-"
					: `${((value as number) * 100).toFixed(2)}%`;
			},
			size: 120
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: () => <StaffActions />,
			size: 60,
			enableHiding: false
		}
	];
};

export const USERS: IUser[] = [
	{
		firstName: "Samantha",
		lastName: "Luis",
		email: "samantha.luis@travelhub.com",
		role: "Admin",
		status: "Active",
		split: null
	},
	{
		firstName: "Alex",
		lastName: "Benford",
		email: "alex.benford@travelhub.com",
		role: "Sales Manager",
		status: "Active",
		split: 0.0005
	},
	{
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@travelhub.com",
		role: "Travel Agent",
		status: "Inactive",
		split: 0.001
	},
	{
		firstName: "Emily",
		lastName: "Clark",
		email: "emily.clark@travelhub.com",
		role: "Tour Guide",
		status: "Active",
		split: null
	},
	{
		firstName: "Michael",
		lastName: "Brown",
		email: "michael.brown@travelhub.com",
		role: "Marketing Manager",
		status: "Active",
		split: 0.02
	},
	{
		firstName: "Olivia",
		lastName: "Martinez",
		email: "olivia.martinez@travelhub.com",
		role: "Customer Support",
		status: "Inactive",
		split: null
	},
	{
		firstName: "Daniel",
		lastName: "Smith",
		email: "daniel.smith@travelhub.com",
		role: "Finance Manager",
		status: "Active",
		split: 0.005
	},
	{
		firstName: "Sophia",
		lastName: "Taylor",
		email: "sophia.taylor@travelhub.com",
		role: "Partner Manager",
		status: "Active",
		split: null
	},
	{
		firstName: "James",
		lastName: "Wilson",
		email: "james.wilson@travelhub.com",
		role: "Regional Manager",
		status: "Inactive",
		split: 0.01
	},
	{
		firstName: "Isabella",
		lastName: "Davis",
		email: "isabella.davis@travelhub.com",
		role: "Super Admin",
		status: "Active",
		split: 0.015
	}
];
