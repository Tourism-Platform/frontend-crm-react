import { type FC } from "react";
import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ScrollArea, ScrollBar } from "@/shared/ui";

import {
	type IDayItem,
	type TOptionsData,
	containerIdDay,
	containerIdTrip
} from "../model";

import { DroppableDayContainer } from "./droppable-day-container";
import { DroppableTripContainer } from "./droppable-trip-container";

interface IBoardColumnsProps {
	data: {
		tripDetails: IDayItem[];
		days: { [day: number]: IDayItem[] };
	};
	control: Control<{ optionsData: TOptionsData }>;
}

export const BoardColumns: FC<IBoardColumnsProps> = ({ data, control }) => {
	const { t } = useTranslation("tour_itinerary_page");

	return (
		<ScrollArea className="flex-1 overflow-x-auto p-4">
			<div className="flex gap-4 min-w-max ">
				{/* Trip details */}
				<div className="w-100 flex-shrink-0">
					<h3 className="font-semibold mb-3  ">
						{t("trip_details.title")}
					</h3>

					{/* droppable tripDetails container */}
					<DroppableTripContainer
						items={data.tripDetails}
						containerId={containerIdTrip()}
						showEmptyPlaceholder={true}
					/>
				</div>

				{/* days */}
				{Object.keys(data.days).map((key, index) => {
					const day = Number(key);
					return (
						<div key={key} className="w-100 flex-shrink-0">
							<h3 className="font-semibold mb-3">
								{t("day_details.title", { day: day })}
								<span className="text-sm text-muted-foreground font-normal ml-2">
									• Uzbekistan, Tashkent
								</span>
							</h3>

							<DroppableDayContainer
								items={data.days[day]}
								day={index + 1}
								control={control}
								containerId={containerIdDay(day)}
							/>
						</div>
					);
				})}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
