import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/shared/ui";

import {
	CURRENCY_LABELS,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	type ICommission
} from "@/entities/commission";

import type { TEditCommissionTypeSchema } from "@/features/settings";

import { FinancialActions } from "../ui/financial-actions";

export const COLUMNS = (
	onEdit: (id: string, data: TEditCommissionTypeSchema) => void,
	onDelete: (id: string) => void
): ColumnDef<ICommission>[] => {
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
				<div className="font-medium">
					{
						CURRENCY_LABELS[
							row.getValue("name") as ENUM_CURRENCY_OPTIONS_TYPE
						]
					}
				</div>
			),
			size: 200
		},
		{
			header: t("commission_type.table.rate"),
			accessorKey: "rate",
			size: 160
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => (
				<FinancialActions
					row={row.original}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
			size: 60,
			enableHiding: false
		}
	];
};
