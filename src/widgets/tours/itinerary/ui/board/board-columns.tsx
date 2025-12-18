import {
	SortableContext,
	horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ScrollArea, ScrollBar } from "@/shared/ui";

import { type IOptionData, columnId, containerIdTrip } from "../../model";
import { DroppableTripContainer } from "../droppable-day-container";

import { SortableDayColumn } from "./sortable-day-column";

interface IBoardColumnsProps {
	data: IOptionData;
	optionId: number;
	onRemoveItem: (loc: {
		optionId: number;
		location: "tripDetails" | "day";
		day?: number;
		index: number;
		nestedIndex?: number;
	}) => void;
}

export const BoardColumns: FC<IBoardColumnsProps> = ({
	data,
	optionId,
	onRemoveItem
}) => {
	const { t } = useTranslation("tour_itinerary_page");

	const dayIds = useMemo(
		() => data.dayOrder.map((day) => columnId(day)),
		[data.dayOrder]
	);

	return (
		<ScrollArea className="flex-1 overflow-x-auto p-4">
			<div className="flex gap-4 min-w-max ">
				{/* Trip details */}
				<div className="w-100 flex-shrink-0">
					<h3 className="font-semibold px-1 mb-3">
						{t("trip_details.title")}
					</h3>
					<DroppableTripContainer
						items={data.tripDetails}
						containerId={containerIdTrip()}
						showEmptyPlaceholder={true}
						optionId={optionId}
						onRemoveItem={onRemoveItem}
					/>
				</div>

				{/* days */}
				<SortableContext
					items={dayIds}
					strategy={horizontalListSortingStrategy}
				>
					{data.dayOrder.map((day, index) => {
						return (
							<div
								key={day}
								className="w-100 flex-shrink-0 flex flex-col"
							>
								<h3 className="font-semibold mb-3">
									{t("day_details.title", {
										day: index + 1
									})}
									<span className="text-sm text-muted-foreground font-normal ml-2">
										• Uzbekistan, Tashkent
									</span>
								</h3>
								<SortableDayColumn
									day={day}
									items={data.days[day]}
									optionId={optionId}
									onRemoveItem={onRemoveItem}
								/>
							</div>
						);
					})}
				</SortableContext>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
