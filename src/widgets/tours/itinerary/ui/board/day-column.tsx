import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { type FC } from "react";

import { cn } from "@/shared/lib";
import { withErrorBoundary } from "@/shared/ui";

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

const DayColumnBase: FC<IDayColumnProps> = ({
	day,
	items,
	isDragging,
	isOverlay,
	attributes,
	listeners,
	optionId,
	onRemoveItem,
	onDuplicateItem,
	onSaveItemToLibrary
}) => {
	return (
		<div
			className={cn(
				"flex w-100 flex-shrink-0 flex-col transition-opacity",
				!isOverlay && "min-h-0 flex-1",
				isDragging && !isOverlay && "opacity-30",
				isOverlay &&
					"cursor-grabbing rounded-lg border bg-background opacity-90 shadow-2xl ring-2 ring-primary"
			)}
		>
			<DroppableDayContainer
				items={items}
				day={day}
				containerId={containerIdDay(day)}
				sortableProps={{ attributes, listeners }}
				optionId={optionId}
				onRemoveItem={onRemoveItem}
				onDuplicateItem={onDuplicateItem}
				onSaveItemToLibrary={onSaveItemToLibrary}
			/>
		</div>
	);
};

export const DayColumn = withErrorBoundary(DayColumnBase);
