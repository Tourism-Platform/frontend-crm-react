import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { formatMoney } from "@/shared/utils";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	type IHotelRoomRate,
	type ISupplierFeeFormRow,
	type THotelRoomCharge
} from "@/entities/supplier";

import type { IProductSeasonRateRow } from "../model";
import { useInheritedProductSeasonRates } from "../model";

interface IProductSeasonRatesProps {
	rows: IProductSeasonRateRow[];
}

const chargeTypLabelKey = (
	typ: THotelRoomCharge["typ"]
): "product_seasons.charge.fixed" | "product_seasons.charge.per_duration" =>
	typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION
		? "product_seasons.charge.per_duration"
		: "product_seasons.charge.fixed";

const feeLineLabel = (
	fee: ISupplierFeeFormRow,
	untitled: string
): { name: string; amount: string } => ({
	name: fee.name?.trim() || untitled,
	amount: formatMoney(fee.cost ?? 0, { currency: fee.currency })
});

const SeasonRateFees: FC<{
	fees: ISupplierFeeFormRow[] | null | undefined;
}> = ({ fees }) => {
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
				const line = feeLineLabel(fee, t("product_seasons.fees.title"));
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

const SeasonRateDetails: FC<{ rate: IHotelRoomRate }> = ({ rate }) => {
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
				{t(chargeTypLabelKey(expenses.typ))}
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

export const InheritedProductSeasonRates: FC = () => {
	const { rows, isLoading } = useInheritedProductSeasonRates();

	if (isLoading || !rows.length) {
		return null;
	}

	return <ProductSeasonRates rows={rows} />;
};
