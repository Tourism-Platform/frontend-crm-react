import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { type FC } from "react";

import { cn } from "@/shared/lib";

import { type IBaseDnDProps, type IDayItem, containerIdDay } from "../../model";
import { DroppableDayContainer } from "../droppable-day-container";

export interface IDayColumnProps extends IBaseDnDProps {
	day: number;
	items: IDayItem[];
	isDragging?: boolean;
	isOverlay?: boolean;
	attributes?: DraggableAttributes;
	listeners?: SyntheticListenerMap;
}

export const DayColumn: FC<IDayColumnProps> = ({
	day,
	items,
	isDragging,
	isOverlay,
	attributes,
	listeners,
	optionId,
	onRemoveItem
}) => {
	return (
		<div
			className={cn(
				"w-100 flex-shrink-0 flex flex-col transition-opacity",
				isDragging && !isOverlay && "opacity-30",
				isOverlay &&
					"opacity-90 shadow-2xl cursor-grabbing ring-2 ring-primary bg-background rounded-lg border"
			)}
		>
			<DroppableDayContainer
				items={items}
				day={day}
				containerId={containerIdDay(day)}
				sortableProps={{ attributes, listeners }}
				optionId={optionId}
				onRemoveItem={onRemoveItem}
			/>
		</div>
	);
};
