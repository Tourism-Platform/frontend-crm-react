import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Checkbox } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type IReconciliationSupplierPayment } from "@/entities/finance";

import { OpenReconciliation } from "@/features/finance";

export const COLUMNS = (): ColumnDef<IReconciliationSupplierPayment>[] => {
	const { t } = useTranslation("reconciliation_id_page");
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
			header: t("table.id"),
			accessorKey: "id",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("id")}</div>
			),
			size: 60
		},
		{
			header: t("table.component"),
			accessorKey: "component",
			size: 300
		},
		{
			header: t("table.plannedAmount"),
			accessorKey: "plannedAmount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("plannedAmount"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.actualAmount"),
			accessorKey: "actualAmount",
			cell: ({ row }) => (
				<div className="font-medium">
					{formatToDollars(row.getValue("actualAmount"))}
				</div>
			),
			size: 140
		},
		{
			header: t("table.variance"),
			accessorKey: "variance",
			cell: ({ row }) => {
				const variance = parseFloat(row.getValue("variance"));
				return (
					<div
						className={cn(
							"font-medium",
							variance < 0
								? "text-red-500"
								: variance > 0
									? "text-green-500"
									: "text-[#71717A]"
						)}
					>
						{formatToDollars(variance)}
					</div>
				);
			},
			size: 120
		},
		{
			id: "actions",
			cell: ({ row }) => <OpenReconciliation payment={row.original} />,
			size: 80,
			enableHiding: false
		}
	];
};
