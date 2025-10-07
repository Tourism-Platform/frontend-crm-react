import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { type FC } from "react";

import { cn } from "@/shared/lib";
import { Card } from "@/shared/ui";

import { type IDayItem, itemId } from "../model";

import { DraggableDayItem } from "./draggable-day-item";

export const DroppableTripContainer: FC<{
	items: IDayItem[];
	containerId: string;
	showEmptyPlaceholder?: boolean;
}> = ({ items, containerId, showEmptyPlaceholder = false }) => {
	const { setNodeRef, isOver } = useDroppable({ id: containerId });
	return (
		<Card
			ref={setNodeRef}
			className={cn(
				"space-y-2 min-h-[200px] rounded-lg p-3 border-2 border-dashed ",
				isOver ? "ring-2 ring-primary" : ""
			)}
		>
			<SortableContext
				items={items.map((it) => itemId(it.id))}
				strategy={verticalListSortingStrategy}
			>
				{items.length === 0 && showEmptyPlaceholder ? (
					<div className="h-32 flex items-center justify-center text-gray-400 text-sm">
						Drag & drop Event here
					</div>
				) : (
					items.map((item) => (
						<div key={item.id} className="mb-2">
							<DraggableDayItem item={item} />
						</div>
					))
				)}
			</SortableContext>
		</Card>
	);
};
