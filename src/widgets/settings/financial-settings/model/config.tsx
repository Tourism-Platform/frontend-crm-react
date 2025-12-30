import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import {
	CURRENCY_LABELS,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	type ICommission
} from "@/entities/commission";

import { FinancialActions } from "../ui/financial-actions";

export const COLUMNS = (): ColumnDef<ICommission>[] => {
	const { t } = useTranslation("financial_settings_page");

	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("commission_type.table.name"),
			meta: {
				headerTitle: t("commission_type.table.name")
			},
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
			meta: {
				headerTitle: t("commission_type.table.rate")
			},
			accessorKey: "rate",
			size: 160
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => <FinancialActions row={row.original} />,
			size: 60,
			enableHiding: false
		}
	];
};
