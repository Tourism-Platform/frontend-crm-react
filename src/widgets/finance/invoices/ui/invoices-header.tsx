import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import {
	ENUM_INVOICE_STATUS,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS,
	type TInvoiceStatusCounts
} from "@/entities/finance";

interface IInvoicesHeaderProps {
	statusCounts?: TInvoiceStatusCounts;
}

export const InvoicesHeader: FC<IInvoicesHeaderProps> = ({ statusCounts }) => {
	const { t } = useTranslation(["invoices_page", "options"]);

	const statusEntries = Object.values(ENUM_INVOICE_STATUS);

	return (
		<div className="flex items-center justify-between">
			<h1 className="text-3xl font-bold">
				{t("page_name", { ns: "invoices_page" })}
			</h1>

			<div className="flex gap-2">
				{statusEntries.map((status) => {
					const count = statusCounts?.[status] || 0;
					const label = t(INVOICE_STATUS_LABELS[status], {
						ns: "options"
					});
					const variant = INVOICE_STATUS_VARIANTS[status];

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
