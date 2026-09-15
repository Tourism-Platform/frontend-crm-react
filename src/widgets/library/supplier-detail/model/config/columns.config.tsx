import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { Badge, Skeleton } from "@/shared/ui";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	SUPPLIER_TYPE_BADGE,
	type TSupplierProduct,
	buildSupplierProductEditRoute
} from "@/entities/supplier";

import { SupplierProductsActions } from "../../ui/supplier-products-actions";

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
			cell: ({ row }) => {
				const { id, name, typ } = row.original;
				const title = name || t("products.table.empty");
				const href = buildSupplierProductEditRoute(typ, {
					supplierId,
					productId: id
				});

				if (href) {
					return (
						<Link
							to={href}
							title={title}
							className="min-w-0 truncate font-medium hover:underline"
						>
							{title}
						</Link>
					);
				}

				return (
					<span
						className="min-w-0 truncate font-medium"
						title={title}
					>
						{title}
					</span>
				);
			},
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
				if (!typ) {
					return <span>{t("products.table.empty")}</span>;
				}
				const { variant, label } = SUPPLIER_TYPE_BADGE[typ];
				return (
					<Badge variant={variant} size="sm">
						{t(label, { ns: "options" })}
					</Badge>
				);
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
