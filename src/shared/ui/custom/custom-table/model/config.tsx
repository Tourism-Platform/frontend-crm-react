import { type ColumnDef } from "@tanstack/react-table";

import { cn } from "@/shared/lib/class-merge";
import { Badge } from "@/shared/ui/shadcn-ui/badge";
import { Checkbox } from "@/shared/ui/shadcn-ui/checkbox";

import { multiColumnFilterFn, statusFilterFn } from "./helpers";
import type { IItem } from "./types";

export const COLUMNS: ColumnDef<IItem>[] = [
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
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("name")}</div>
		),
		size: 180,
		filterFn: multiColumnFilterFn,
		enableHiding: false
	},
	{
		header: "Email",
		accessorKey: "email",
		size: 220
	},
	{
		header: "Location",
		accessorKey: "location",
		cell: ({ row }) => (
			<div>
				<span className="text-lg leading-none">
					{row.original.flag}
				</span>{" "}
				{row.getValue("location")}
			</div>
		),
		size: 180
	},
	{
		header: "Status",
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
		size: 100,
		filterFn: statusFilterFn
	},
	{
		header: "Performance",
		accessorKey: "performance"
	},
	{
		header: "Balance",
		accessorKey: "balance",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("balance"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD"
			}).format(amount);
			return formatted;
		},
		size: 120
	},
	{
		id: "actions",
		header: () => <span className="sr-only">Actions</span>,
		// cell: ({ row }) => <RowActions row={row} />,
		size: 60,
		enableHiding: false
	}
];
