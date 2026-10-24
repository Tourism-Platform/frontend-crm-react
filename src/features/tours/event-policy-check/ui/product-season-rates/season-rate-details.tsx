import { type FC } from "react";
import { useTranslation } from "react-i18next";

import type { IHotelRoomRate } from "@/entities/supplier";

import { PRODUCT_SEASON_CHARGE_LABELS } from "../../model";

import { SeasonRateFees } from "./season-rate-fees";

interface ISeasonRateDetailsProps {
	rate: IHotelRoomRate;
}

export const SeasonRateDetails: FC<ISeasonRateDetailsProps> = ({ rate }) => {
	const { t } = useTranslation("common_events");
	const { expenses } = rate;

	return (
		<li className="grid gap-1">
			<p>
				{t("product_seasons.range", {
					from: rate.fromDate,
					to: rate.toDate
				})}
			</p>
			<p className="text-muted-foreground text-xs">
				{t("product_seasons.charge.label")}:{" "}
				{t(PRODUCT_SEASON_CHARGE_LABELS[expenses.typ])}
			</p>
			<div className="grid gap-0.5">
				<p className="text-xs font-medium">
					{t("product_seasons.fees.title")}
				</p>
				<SeasonRateFees fees={expenses.fees} />
			</div>
		</li>
	);
};
