import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import {
	ENUM_RECONCILIATION_STATUS,
	RECONCILIATION_STATUS_LABELS,
	RECONCILIATION_STATUS_VARIANTS,
	type TReconciliationStatusCounts
} from "@/entities/finance";

interface IReconciliationHeaderProps {
	statusCounts?: TReconciliationStatusCounts;
}

export const ReconciliationHeader: FC<IReconciliationHeaderProps> = ({
	statusCounts
}) => {
	const { t } = useTranslation(["reconciliation_page", "options"]);

	const statusEntries = Object.values(ENUM_RECONCILIATION_STATUS);

	return (
		<div className="flex items-center justify-between">
			<h1 className="text-3xl">
				{t("page_name", { ns: "reconciliation_page" })}
			</h1>

			<div className="flex gap-2">
				{statusEntries.map((status) => {
					const count = statusCounts?.[status] || 0;
					const label = t(RECONCILIATION_STATUS_LABELS[status], "", {
						ns: "options"
					});
					const variant = RECONCILIATION_STATUS_VARIANTS[status];

					return (
						<Badge
							key={status}
							variant={variant}
							className="p-3 flex gap-1 text-lg"
						>
							<span>{label}:</span>
							<span>{count}</span>
						</Badge>
					);
				})}
			</div>
		</div>
	);
};
