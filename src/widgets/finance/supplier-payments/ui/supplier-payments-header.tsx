import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	SUPPLIER_PAYMENT_STATUS_VARIANTS,
	type TSupplierPaymentStatusCounts
} from "@/entities/finance";

interface ISupplierPaymentsHeaderProps {
	statusCounts?: TSupplierPaymentStatusCounts;
}

export const SupplierPaymentsHeader: FC<ISupplierPaymentsHeaderProps> = ({
	statusCounts
}) => {
	const { t } = useTranslation(["supplier_payments_page", "options"]);

	const statusEntries = Object.values(ENUM_SUPPLIER_PAYMENT_STATUS);

	return (
		<div className="flex items-center justify-between">
			<h1 className="text-3xl">
				{t("page_name", { ns: "supplier_payments_page" })}
			</h1>

			<div className="flex gap-2">
				{statusEntries.map((status) => {
					const count = statusCounts?.[status] || 0;
					const label = t(SUPPLIER_PAYMENT_STATUS_LABELS[status], {
						ns: "options"
					});
					const variant = SUPPLIER_PAYMENT_STATUS_VARIANTS[status];

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
