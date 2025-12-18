import { useDndContext, useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import { type IDayItem, itemId } from "../../model";

import { DraggableDayItem } from "./draggable-day-item";

interface IDroppableNestedContainerProps {
	items: IDayItem[];
	parentBlockId: string;
	onRemoveNested: (index: number) => void;
}

export const DroppableNestedContainer: FC<IDroppableNestedContainerProps> = ({
	items,
	parentBlockId,
	onRemoveNested
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const containerId = `container:nested:${parentBlockId}`;
	const { setNodeRef, isOver } = useDroppable({
		id: containerId
	});
	const { over } = useDndContext();

	const isOverItem = items.some((item) => itemId(item.block_id) === over?.id);
	const isOverContainer = isOver || isOverItem;

	return (
		<div
			ref={setNodeRef}
			className={cn(
				"mt-3 p-2 rounded-md border-2 border-dashed transition-colors",
				isOverContainer
					? "bg-primary/10 border-primary"
					: "bg-muted/30 border-muted-foreground/20"
			)}
		>
			<SortableContext
				items={items.map((it) => itemId(it.block_id))}
				strategy={verticalListSortingStrategy}
			>
				<div className="space-y-0">
					{items.map((item, index) => (
						<div key={item.block_id} className="mb-2">
							<DraggableDayItem
								item={item}
								onRemove={() => onRemoveNested(index)}
							/>
						</div>
					))}

					{/* Always visible drop zone */}
					<div
						className={cn(
							"flex h-20 items-center justify-center rounded border border-dashed border-muted-foreground/40 text-muted-foreground text-xs transition-all"
						)}
					>
						{t("trip_details.container.empty")}
					</div>
				</div>
			</SortableContext>
		</div>
	);
};
