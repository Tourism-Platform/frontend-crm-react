import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Skeleton } from "@/shared/ui";

import type { ITourPackageListItem } from "@/entities/tour";

interface IPackagesColumnsParams {
	tourId: string;
	optionId: string;
}

export const PRICING_REVIEW_PACKAGE_COLUMNS = (
	t: TFunction<"tour_pricing_review_page", undefined>,
	{ tourId, optionId }: IPackagesColumnsParams
): ColumnDef<ITourPackageListItem>[] => {
	return [
		{
			header: t("table.name"),
			meta: {
				headerTitle: t("table.name"),
				skeleton: <Skeleton className="h-8 w-[200px]" />
			},
			accessorKey: "name",
			cell: ({ row }) => {
				const { id, name } = row.original;
				const title = name.trim() || t("table.untitled");
				const href = buildRoute(ENUM_PATH.TOURS.PACKAGE, {
					tourId,
					optionId,
					packageId: id
				});

				return (
					<div className="flex w-full min-w-0 items-center">
						<Link
							to={href}
							title={title}
							className="min-w-0 truncate font-medium hover:underline"
						>
							{title}
						</Link>
					</div>
				);
			},
			size: 260
		}
	];
};
