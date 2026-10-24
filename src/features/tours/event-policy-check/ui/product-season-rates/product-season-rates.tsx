import { type FC } from "react";
import { useTranslation } from "react-i18next";

import type { IProductSeasonRateRow } from "@/entities/tour";

import { SeasonRateDetails } from "./season-rate-details";

interface IProductSeasonRatesProps {
	rows: IProductSeasonRateRow[];
}

export const ProductSeasonRates: FC<IProductSeasonRatesProps> = ({ rows }) => {
	const { t } = useTranslation("common_events");

	if (!rows.length) {
		return null;
	}

	return (
		<div className="grid gap-2">
			<h3 className="text-sm font-medium">
				{t("product_seasons.title")}
			</h3>
			<ul className="grid gap-3">
				{rows.map((row) => (
					<li
						key={`${row.roomLabel}-${row.rates[0]?.fromDate}`}
						className="grid gap-1"
					>
						{row.roomLabel ? (
							<p className="text-sm font-medium">
								{row.roomLabel}
							</p>
						) : null}
						<ul className="text-muted-foreground grid gap-2 text-sm">
							{row.rates.map((rate) => (
								<SeasonRateDetails
									key={`${rate.fromDate}-${rate.toDate}`}
									rate={rate}
								/>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};
