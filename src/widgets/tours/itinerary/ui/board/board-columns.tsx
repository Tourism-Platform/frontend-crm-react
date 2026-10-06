import {
	SortableContext,
	horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CustomScroll, withErrorBoundary } from "@/shared/ui";

import {
	type IBaseDnDProps,
	type IOptionData,
	columnId
	// containerIdTrip
} from "../../model";

// import { DroppableTripContainer } from "../droppable-day-container";

import { SortableDayColumn } from "./sortable-day-column";

interface IBoardColumnsProps extends IBaseDnDProps {
	data: IOptionData;
}

const BoardColumnsBase: FC<IBoardColumnsProps> = ({
	data,
	optionId,
	onRemoveItem,
	onDuplicateItem,
	onSaveItemToLibrary
}) => {
	const { t } = useTranslation("tour_itinerary_page");

	const dayIds = useMemo(
		() => data.dayOrder.map((day) => columnId(day)),
		[data.dayOrder]
	);

	return (
		<CustomScroll
			orientation="horizontal"
			className="min-w-0 flex-1 overflow-y-hidden p-4"
		>
			<div className="flex h-full min-w-max gap-4">
				{/* Trip details */}
				{/* <div className="w-100 flex-shrink-0">
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
				</div> */}

				{/* days */}
				<SortableContext
					items={dayIds}
					strategy={horizontalListSortingStrategy}
				>
					{data.dayOrder.map((day, index) => {
						return (
							<div
								key={day}
								className="flex h-full min-h-0 w-100 flex-shrink-0 flex-col"
							>
								<h3 className="mb-3 shrink-0 text-center font-semibold">
									{t("day_details.title", {
										day: index + 1
									})}
									{/* <span className="text-sm text-muted-foreground font-normal ml-2">
										• Uzbekistan, Tashkent
									</span> */}
								</h3>
								<SortableDayColumn
									day={day}
									items={data.days[day]}
									optionId={optionId}
									onRemoveItem={onRemoveItem}
									onDuplicateItem={onDuplicateItem}
									onSaveItemToLibrary={onSaveItemToLibrary}
								/>
							</div>
						);
					})}
				</SortableContext>
			</div>
		</CustomScroll>
	);
};

export const BoardColumns = withErrorBoundary(BoardColumnsBase);
