import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	type ISupplier,
	SUPPLIER_TYPE_BADGE
} from "@/entities/supplier";

import { SuppliersActions } from "../ui/suppliers-actions";

export const COLUMNS = (
	t: TFunction<"suppliers_page", undefined>
): ColumnDef<ISupplier>[] => {
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.brand_name"),
			meta: {
				headerTitle: t("table.brand_name"),
				skeleton: <Skeleton className="h-8 w-[200px]" />
			},
			accessorKey: "brandName",
			cell: ({ row }) => {
				const { id, brandName } = row.original;
				const href = buildRoute(ENUM_PATH.LIBRARY.SUPPLIER, {
					supplierId: id
				});
				return (
					<Link
						to={href}
						title={brandName}
						className="min-w-0 truncate font-medium hover:underline"
					>
						{brandName}
					</Link>
				);
			},
			size: 220
		},
		{
			header: t("table.legal_name"),
			meta: {
				headerTitle: t("table.legal_name"),
				skeleton: <Skeleton className="h-4 w-[160px]" />
			},
			accessorKey: "legalName",
			cell: ({ row }) => (
				<span className="truncate">
					{row.original.legalName || t("table.empty")}
				</span>
			),
			size: 180
		},
		{
			header: t("table.types"),
			meta: {
				headerTitle: t("table.types"),
				skeleton: <Skeleton className="h-4 w-[140px]" />
			},
			accessorKey: "supplierTypes",
			cell: ({ row }) => {
				const types = row.original
					.supplierTypes as ENUM_SUPPLIER_TYPE_TYPE[];
				if (!types.length) {
					return <span>{t("table.empty")}</span>;
				}
				return (
					<div className="flex flex-wrap gap-1">
						{types.map((typ) => {
							const { variant, label } = SUPPLIER_TYPE_BADGE[typ];
							return (
								<Badge key={typ} variant={variant} size="sm">
									{t(label, { ns: "options" })}
								</Badge>
							);
						})}
					</div>
				);
			},
			size: 280
		},
		{
			header: t("table.phone"),
			meta: {
				headerTitle: t("table.phone"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "phone",
			cell: ({ row }) => (
				<span>{row.original.phone || t("table.empty")}</span>
			),
			size: 140
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => <SuppliersActions item={row.original} />,
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 60,
			enableHiding: false
		}
	];
};
