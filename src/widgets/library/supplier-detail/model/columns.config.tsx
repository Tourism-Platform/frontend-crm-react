import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	SUPPLIER_TYPE_LABELS,
	type TSupplierProduct
} from "@/entities/supplier";

import { SupplierProductsActions } from "../ui/supplier-products-actions";

export const COLUMNS = (
	t: TFunction<"supplier_id_page", undefined>,
	supplierId: string
): ColumnDef<TSupplierProduct>[] => {
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("products.table.name"),
			meta: {
				headerTitle: t("products.table.name"),
				skeleton: <Skeleton className="h-8 w-[200px]" />
			},
			accessorKey: "name",
			cell: ({ row }) => (
				<span
					className="min-w-0 truncate font-medium"
					title={row.original.name}
				>
					{row.original.name || t("products.table.empty")}
				</span>
			),
			size: 260
		},
		{
			header: t("products.table.type"),
			meta: {
				headerTitle: t("products.table.type"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "typ",
			cell: ({ row }) => {
				const typ = row.original.typ as ENUM_SUPPLIER_TYPE_TYPE;
				const key = SUPPLIER_TYPE_LABELS[typ];
				const label = key
					? t(key, { ns: "options" })
					: typ || t("products.table.empty");
				return <span className="truncate">{label}</span>;
			},
			size: 140
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => (
				<SupplierProductsActions
					supplierId={supplierId}
					item={row.original}
				/>
			),
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 60,
			enableHiding: false
		}
	];
};
