import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type FC } from "react";
import type { Control } from "react-hook-form";

import { type IDayItem, type TOptionsData, columnId } from "../model";

import { DayColumn } from "./day-column";

interface ISortableDayColumnProps {
	day: number;
	items: IDayItem[];
	control: Control<{ optionsData: TOptionsData }>;
	optionId: number;
}

export const SortableDayColumn: FC<ISortableDayColumnProps> = ({
	day,
	items,
	control,
	optionId
}) => {
	const id = columnId(day);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id });

	const style = {
		transform: CSS.Translate.toString(transform),
		transition
	};

	return (
		<div ref={setNodeRef} style={style}>
			<DayColumn
				day={day}
				items={items}
				control={control}
				isDragging={isDragging}
				attributes={attributes}
				listeners={listeners}
				optionId={optionId}
			/>
		</div>
	);
};
