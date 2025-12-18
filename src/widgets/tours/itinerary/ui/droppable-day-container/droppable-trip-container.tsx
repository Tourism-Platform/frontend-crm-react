import { useDndContext, useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card } from "@/shared/ui";

import { type IBaseDnDProps, type IDayItem, itemId } from "../../model";

import { DraggableDayItem } from "./draggable-day-item";

interface IDroppableTripContainerProps extends IBaseDnDProps {
	items: IDayItem[];
	containerId: string;
	showEmptyPlaceholder?: boolean;
}

export const DroppableTripContainer: FC<IDroppableTripContainerProps> = ({
	items,
	containerId,
	showEmptyPlaceholder = false,
	optionId,
	onRemoveItem
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const { setNodeRef, isOver } = useDroppable({ id: containerId });
	const { over } = useDndContext();

	const isOverItem = items.some((item) => itemId(item.block_id) === over?.id);
	const isOverContainer = isOver || isOverItem;

	return (
		<Card
			ref={setNodeRef}
			className={cn(
				"space-y-2 min-h-[200px] rounded-lg p-3 border-2 border-dashed ",
				isOverContainer ? "ring-2 ring-primary" : ""
			)}
		>
			<SortableContext
				items={items.map((it) => itemId(it.block_id))}
				strategy={verticalListSortingStrategy}
			>
				{items.length === 0 && showEmptyPlaceholder ? (
					<div className="h-32 flex items-center justify-center text-gray-400 text-sm">
						{t("trip_details.container.empty")}
					</div>
				) : (
					items.map((item, index) => (
						<div key={item.block_id} className="mb-2">
							<DraggableDayItem
								item={item}
								onRemove={() =>
									onRemoveItem({
										optionId,
										location: "tripDetails",
										index
									})
								}
								onRemoveNested={(nestedIndex) =>
									onRemoveItem({
										optionId,
										location: "tripDetails",
										index,
										nestedIndex
									})
								}
							/>
						</div>
					))
				)}
			</SortableContext>
		</Card>
	);
};
