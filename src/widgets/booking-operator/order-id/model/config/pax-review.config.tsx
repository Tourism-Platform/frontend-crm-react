import {
	AltArrowDownIcon,
	AltArrowRightIcon
} from "@solar-icons/react/outline";
import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import type { ReactNode } from "react";

import { getCountryLabel } from "@/shared/lib/countries";
import { Button, CopyableValue } from "@/shared/ui";

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
							<AltArrowDownIcon className="size-4 text-muted-foreground" />
						) : (
							<AltArrowRightIcon className="size-4 text-muted-foreground" />
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
			cell: ({ row }) =>
				t(GENDER_LABELS[row.original.gender], { ns: "options" })
		},
		{
			accessorKey: "nationality",
			header: t("pax_information.table.nationality"),
			cell: ({ row }) => getCountryLabel(row.original.nationality, "en")
		},
		{
			accessorKey: "dateOfBirth",
			header: t("pax_information.table.date_of_birth")
		},
		{
			accessorKey: "passportNumber",
			header: t("pax_information.table.passport_number"),
			cell: ({ row }) => (
				<CopyableValue
					value={row.original.passportNumber}
					kind="number"
				/>
			)
		},
		{
			accessorKey: "expiredDate",
			header: t("pax_information.table.expired_date")
		}
	];
};
