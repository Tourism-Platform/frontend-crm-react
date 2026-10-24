import { type FC } from "react";
import { useTranslation } from "react-i18next";

import type { ISupplierFeeFormRow } from "@/entities/supplier";

import { formatSeasonFeeLine } from "../../model";

interface ISeasonRateFeesProps {
	fees: ISupplierFeeFormRow[] | null | undefined;
}

export const SeasonRateFees: FC<ISeasonRateFeesProps> = ({ fees }) => {
	const { t } = useTranslation("common_events");
	const list = fees ?? [];

	if (!list.length) {
		return (
			<p className="text-muted-foreground text-xs">
				{t("product_seasons.fees.empty")}
			</p>
		);
	}

	return (
		<ul className="text-muted-foreground grid gap-0.5 text-xs">
			{list.map((fee, index) => {
				const line = formatSeasonFeeLine(
					fee,
					t("product_seasons.fees.title")
				);
				return (
					<li key={`${line.name}-${index}`}>
						{t("product_seasons.fees.line", {
							name: line.name,
							amount: line.amount
						})}
					</li>
				);
			})}
		</ul>
	);
};
