import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardHeader, CardTitle, Separator } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type ITourSummary } from "@/entities/tour";

interface IPricingReviewSummaryProps {
	summary: ITourSummary;
}

export const PricingReviewSummary: FC<IPricingReviewSummaryProps> = ({
	summary
}) => {
	const { t } = useTranslation("tour_pricing_review_page");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{t("overview.title")}
				</CardTitle>
				<div className="grid grid-flow-col items-center gap-8 justify-start">
					<div className="flex flex-col gap-1">
						<div className="text-xs text-muted-foreground uppercase">
							{t("overview.revenue")}
						</div>
						<div className="text-xl font-medium">
							{formatToDollars(summary.revenue.from)} -{" "}
							{formatToDollars(summary.revenue.to)}
						</div>
					</div>

					<Separator orientation="vertical" className="h-12" />

					<div className="flex flex-col gap-1">
						<div className="text-xs text-muted-foreground uppercase">
							{t("overview.cost")}
						</div>
						<div className="text-xl font-medium">
							{formatToDollars(summary.cost?.from || 0)} -{" "}
							{formatToDollars(summary.cost?.to || 0)}
						</div>
					</div>

					<Separator orientation="vertical" className="h-12" />

					<div className="flex flex-col gap-1">
						<div className="text-xs text-muted-foreground uppercase">
							{t("overview.profit")}
						</div>
						<div className="text-xl font-medium">
							{formatToDollars(summary.profit.from)} -{" "}
							{formatToDollars(summary.profit.to)}
						</div>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
};
