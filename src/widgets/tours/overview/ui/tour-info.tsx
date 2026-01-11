import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { InfoCard, useGetTourStatsQuery } from "@/entities/tour";

import { type ITourInfoOverview, TOUR_INFO_LIST } from "../model";

export const TourInfo: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const {
		data: tourStats,
		isLoading,
		isError
	} = useGetTourStatsQuery(tourId, {
		skip: !tourId
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("info.toasts.load.error"));
		}
	}, [isError, t]);

	const data = TOUR_INFO_LIST.map((item) => ({
		...item,
		value:
			item?.func && tourStats
				? item?.func(tourStats[item?.key as keyof typeof tourStats])
				: tourStats?.[item?.key as keyof typeof tourStats] || "-"
	})) as ITourInfoOverview[];

	return (
		<div className="grid grid-cols-3 gap-4">
			{data?.map((item) => (
				<InfoCard
					key={String(item?.key)}
					label={item?.label}
					value={item?.value}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
};
