import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { type FC } from "react";
import type { Control } from "react-hook-form";

import { cn } from "@/shared/lib";

import { type IDayItem, type TOptionsData, containerIdDay } from "../model";

import { DroppableDayContainer } from "./droppable-day-container";

export interface IDayColumnProps {
	day: number;
	items: IDayItem[];
	control: Control<{ optionsData: TOptionsData }>;
	isDragging?: boolean;
	isOverlay?: boolean;
	attributes?: DraggableAttributes;
	listeners?: SyntheticListenerMap;
	optionId: number;
}

export const DayColumn: FC<IDayColumnProps> = ({
	day,
	items,
	control,
	isDragging,
	isOverlay,
	attributes,
	listeners,
	optionId
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
				control={control}
				containerId={containerIdDay(day)}
				sortableProps={{ attributes, listeners }}
				optionId={optionId}
			/>
		</div>
	);
};
