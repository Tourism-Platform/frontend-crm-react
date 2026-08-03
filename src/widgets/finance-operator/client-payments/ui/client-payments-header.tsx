import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import {
	ENUM_PAYMENT_STATUS,
	PAYMENT_STATUS_LABELS,
	PAYMENT_STATUS_VARIANTS,
	type TPaymentStatusCounts
} from "@/entities/finance";

interface IClientPaymentsHeaderProps {
	statusCounts?: TPaymentStatusCounts;
}

export const ClientPaymentsHeader: FC<IClientPaymentsHeaderProps> = ({
	statusCounts
}) => {
	const { t } = useTranslation(["client_payments_page", "options"]);

	const statusEntries = Object.values(ENUM_PAYMENT_STATUS);

	return (
		<div className="flex items-center justify-between">
			<h1 className="text-3xl">{t("page_name")}</h1>

			<div className="flex gap-2">
				{statusEntries.map((status) => {
					const count = statusCounts?.[status] || 0;
					const label = t(PAYMENT_STATUS_LABELS[status], {
						ns: "options"
					});
					const variant = PAYMENT_STATUS_VARIANTS[status];

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
