import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { withErrorBoundary } from "@/shared/ui";

import { InfoCard, useGetTourStatisticsQuery } from "@/entities/tour";

import {
	TOUR_ORDERS_STATS_CONFIG,
	TOUR_REVENUE_STATS_CONFIG,
	getTourStatCardValue
} from "../model";

const TourInfoBase: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const {
		data: tourStats,
		isLoading,
		isError
	} = useGetTourStatisticsQuery(tourId, {
		skip: !tourId
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("info.toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="grid gap-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{TOUR_ORDERS_STATS_CONFIG.map((item) => (
					<InfoCard
						key={item.label}
						label={item.label}
						value={getTourStatCardValue(item, tourStats)}
						isLoading={isLoading}
					/>
				))}
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{TOUR_REVENUE_STATS_CONFIG.map((item) => (
					<InfoCard
						key={item.label}
						label={item.label}
						value={getTourStatCardValue(item, tourStats)}
						isLoading={isLoading}
					/>
				))}
			</div>
		</div>
	);
};

export const TourInfo = withErrorBoundary(TourInfoBase);
