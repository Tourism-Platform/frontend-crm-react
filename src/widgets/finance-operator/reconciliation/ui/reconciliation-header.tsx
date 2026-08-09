import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type IReconciliationTotals } from "@/entities/finance";

interface IReconciliationHeaderProps {
	totals?: IReconciliationTotals;
}

type TTotalKey = keyof IReconciliationTotals;

interface IKpiCard {
	primaryKey: TTotalKey;
	secondary: readonly TTotalKey[];
}

const KPI_CARDS = [
	{
		primaryKey: "receivable",
		secondary: ["revenueAccrued", "revenueSettled"]
	},
	{
		primaryKey: "payable",
		secondary: ["costAccrued", "costSettled"]
	},
	{
		primaryKey: "settledProfit",
		secondary: ["accrualProfit"]
		// tone: "profit"
	}
] satisfies readonly IKpiCard[];

export const ReconciliationHeader: FC<IReconciliationHeaderProps> = ({
	totals
}) => {
	const { t } = useTranslation("reconciliation_page");

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl">{t("page_name")}</h1>

			<div className="grid grid-cols-3 gap-6">
				{KPI_CARDS.map(({ primaryKey, secondary }) => {
					const primaryValue = totals?.[primaryKey] ?? 0;
					const isProfit = primaryKey === "settledProfit";

					return (
						<Card key={primaryKey} className="gap-3">
							<CardHeader className="block">
								<CardTitle className="text-lg font-medium text-muted-foreground">
									{t(`totals.${primaryKey}`)}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-3">
								<span
									className={cn(
										"text-4xl tabular-nums",
										isProfit &&
											primaryValue < 0 &&
											"text-red-500",
										isProfit &&
											primaryValue > 0 &&
											"text-green-600"
									)}
								>
									{formatToDollars(primaryValue)}
								</span>

								<div className="flex flex-wrap gap-x-4 gap-y-1">
									{secondary.map((key) => (
										<span
											key={key}
											className="text-sm text-muted-foreground tabular-nums"
										>
											{t(`totals.${key}`)}:{" "}
											<span className="font-medium text-foreground">
												{formatToDollars(
													totals?.[key] ?? 0
												)}
											</span>
										</span>
									))}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
};
