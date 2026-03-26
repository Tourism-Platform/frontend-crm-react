import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/ui";

import {
	GENDER_LABELS,
	type IPaxReviewDetail,
	type IPaxReviewItem
} from "@/entities/booking";

export const PAX_REVIEW_COLUMNS = (
	t: TFunction<"order_id_page", undefined>,
	renderSubTable: (items: IPaxReviewDetail[]) => ReactNode
): ColumnDef<IPaxReviewItem, unknown>[] => {
	return [
		{
			id: "expand",
			header: () => null,
			size: 40,
			cell: ({
				row: { getCanExpand, getToggleExpandedHandler, getIsExpanded }
			}) => {
				return getCanExpand() ? (
					<Button
						onClick={getToggleExpandedHandler()}
						variant="ghost"
						size="icon"
					>
						{getIsExpanded() ? (
							<ChevronDown className="size-4 text-muted-foreground" />
						) : (
							<ChevronRight className="size-4 text-muted-foreground" />
						)}
					</Button>
				) : null;
			},
			meta: {
				expandedContent: ({ items }: IPaxReviewItem) =>
					renderSubTable(items)
			}
		},
		{
			accessorKey: "fullName",
			header: t("pax_information.table.full_name")
		},
		{
			accessorKey: "gender",
			header: t("pax_information.table.gender"),
			cell: ({ row }) => t(GENDER_LABELS[row.original.gender])
		},
		{
			accessorKey: "nationality",
			header: t("pax_information.table.nationality")
		},
		{
			accessorKey: "dateOfBirth",
			header: t("pax_information.table.date_of_birth")
		},
		{
			accessorKey: "passportNumber",
			header: t("pax_information.table.passport_number")
		},
		{
			accessorKey: "expiredDate",
			header: t("pax_information.table.expired_date")
		}
	];
};
