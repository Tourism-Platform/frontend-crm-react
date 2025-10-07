import { type FC } from "react";

import { ScrollArea, ScrollBar } from "@/shared/ui";

import { type IDayItem, containerIdDay, containerIdTrip } from "../model";

import { DroppableDayContainer } from "./droppable-day-container";
import { DroppableTripContainer } from "./droppable-trip-container";

interface IBoardColumnsProps {
	data: {
		tripDetails: IDayItem[];
		days: { [day: number]: IDayItem[] };
	};
}

export const BoardColumns: FC<IBoardColumnsProps> = ({ data }) => {
	return (
		<ScrollArea className="flex-1 overflow-x-auto p-4">
			<div className="flex gap-4 min-w-max ">
				{/* Trip details */}
				<div className="w-100 flex-shrink-0">
					<h3 className="font-semibold mb-3  ">Trip details</h3>

					{/* droppable tripDetails container */}
					<DroppableTripContainer
						items={data.tripDetails}
						containerId={containerIdTrip()}
						showEmptyPlaceholder={true}
					/>
				</div>

				{/* days */}
				{[1, 2, 3, 4].map((day) => (
					<div key={day} className="w-100 flex-shrink-0">
						<h3 className="font-semibold mb-3">
							Day {day}
							<span className="text-sm text-muted-foreground font-normal ml-2">
								• Uzbekistan, Tashkent
							</span>
						</h3>

						<DroppableDayContainer
							items={data.days[day]}
							day={day}
							containerId={containerIdDay(day)}
						/>
					</div>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
