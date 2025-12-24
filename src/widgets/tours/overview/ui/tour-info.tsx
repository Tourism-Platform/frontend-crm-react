import { type FC } from "react";

import { InfoCard } from "@/entities/tour";

import { type ITourInfoOverview, TOUR_INFO_LIST } from "../model";

export const TourInfo: FC = () => {
	const tourStats = {
		total: 10,
		completed: 6,
		in_progress: 4,
		tourists: 125,
		confirmed_revenue: 17999,
		potential_revenue: 41250
	};

	const data = TOUR_INFO_LIST.map((item) => ({
		...item,
		value: item?.func
			? item?.func(tourStats[item?.key as keyof typeof tourStats])
			: tourStats[item?.key as keyof typeof tourStats]
	})) as ITourInfoOverview[];

	return (
		<div className="grid grid-cols-3 gap-4">
			{data?.map((item) => (
				<InfoCard
					key={String(item?.key)}
					label={item?.label}
					value={item?.value}
				/>
			))}
		</div>
	);
};
