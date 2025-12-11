import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Checkbox } from "@/shared/ui";

import { FinancialActions } from "../ui/financial-actions";

import type { IMarkup } from "./types";

export const COLUMNS = (): ColumnDef<IMarkup>[] => {
	const { t } = useTranslation("financial_settings_page");

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
			header: t("commission_type.table.name"),
			accessorKey: "name",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("name")}</div>
			),
			size: 200
		},
		{
			header: t("commission_type.table.description"),
			accessorKey: "description",
			size: 320
		},
		{
			header: t("commission_type.table.rate"),
			accessorKey: "rate",
			size: 160
		},
		{
			header: t("commission_type.table.status"),
			accessorKey: "status",
			cell: ({ row }) => (
				<Badge
					className={cn(
						row.getValue("status") === "Unavailable"
							? "bg-muted-foreground/60 text-primary-foreground"
							: "text-green-500"
					)}
				>
					{row.getValue("status")}
				</Badge>
			),
			size: 140
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: () => <FinancialActions />,
			size: 60,
			enableHiding: false
		}
	];
};

export const MARKUPS: IMarkup[] = [
	{
		name: "Tour operator markup",
		description: "20% markup on cost price added by the operator",
		rate: "20% flat rate",
		status: "Available"
	},
	{
		name: "Agency commission",
		description: "Standard 10% commission for travel agencies",
		rate: "10% flat rate",
		status: "Available"
	},
	{
		name: "Seasonal surcharge",
		description: "15% surcharge during peak holiday season",
		rate: "15% seasonal rate",
		status: "Available"
	},
	{
		name: "Early booking discount",
		description: "5% discount for bookings made 3+ months in advance",
		rate: "-5% discount",
		status: "Available"
	},
	{
		name: "Last minute fee",
		description:
			"10% fee for bookings made less than 3 days before departure",
		rate: "10% late fee",
		status: "Available"
	},
	{
		name: "Luxury package markup",
		description: "25% markup applied to premium and luxury packages",
		rate: "25% flat rate",
		status: "Unavailable"
	},
	{
		name: "Group booking discount",
		description: "8% discount for groups of 10 or more travelers",
		rate: "-8% group discount",
		status: "Available"
	},
	{
		name: "Fuel surcharge",
		description: "5% surcharge due to rising fuel costs",
		rate: "5% surcharge",
		status: "Available"
	},
	{
		name: "Insurance fee",
		description: "Mandatory travel insurance fee of 3%",
		rate: "3% insurance fee",
		status: "Unavailable"
	},
	{
		name: "Child discount",
		description: "50% discount for children under 12 years old",
		rate: "-50% child discount",
		status: "Available"
	}
];
